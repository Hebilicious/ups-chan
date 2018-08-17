import moment from "moment-timezone"
import Sugar from "sugar"

import * as Nodewar from "./features.js"
import * as NodewarDB from "./db.js"
import * as DB from "../database/database.js"

const timezone = "Europe/Paris"

/**
 * NodeWar Handler
 * @param  {[type]} message    [description]
 * @param  {[type]} client [description]
 * @return {[type]}        [description]
 */
export async function handleNodeWar(message, client) {
  const key = {
    nodewar: "$nodewar",
    list: "$nwlist",
    attend: "$attend",
    cancel: "$cancel"
  }

  if (!Object.values(key).some(k => message.content.startsWith(k))) return

  const conf = await DB.Connect(message.guild)
    .table("configuration")
    .get(0)
    .run()
  let nodewarChannel = conf.nodeWarChannel
  let attendingRole = conf.attendingRole
  //Filter for our collector
  const filter = function(m) {
    //Check that we have the same author and only 1 word
    if (m.author.id == message.author.id && m.content.split(" ".length == 1)) {
      console.log("Valid Answer")
      return true
    }
  }

  if (!nodewarChannel) {
    //Handle auth
    message.channel
      .send(
        `Please type-in the name of the channel you want to use for the nodewar features. \n **Existing channels** : \n${message.member.guild.channels
          .filter(c => c.type == "text")
          .map(c => `**-** ${c.name}`)
          .join("\n")}`
      )
      .then(() => {
        message.channel
          .awaitMessages(filter, {
            maxMatches: 1,
            time: 60000,
            errors: ["time"]
          })
          .then(collected => {
            let nwChannel = collected.first().content
            if (!message.member.guild.channels.find("name", nwChannel)) {
              message.member.guild
                .createChannel(nwChannel, "text")
                .then(c => console.log(`Created new nodewar channel ${c}.`))
                .then(() =>
                  handleRouting(message, client, key, conf, nwChannel)
                )
            } else {
              handleRouting(message, client, key, conf, nwChannel)
            }
          })
      })
      .catch(console.error)
  } else {
    handleRouting(message, client, key, conf, nodewarChannel)
  }
}

/**
 * Dispatch the correct feature based on the inputed nw command.
 * @param {Message} message
 * @param {Client} client
 * @param {Object} key Contains the accepted command arguments
 * @param {Object} conf Configuration from the database.
 * @param {String} channelName Name of the nodewar channel.
 */
function handleRouting(message, client, key, conf, channelName) {
  console.log("Handling key Routing")
  let nodeWarChannel = message.member.guild.channels.find("name", channelName)
  if (!nodeWarChannel || !conf.nodeWarChannel) {
    console.log("Updating configuration")
    DB.UpdateConfiguration(message.guild, { nodeWarChannel: channelName }).then(
      () => {
        let nodeWarChannel = message.member.guild.channels.find(
          "name",
          channelName
        )
        message.channel.send(channelName + " is now the nodewar channel.")
      }
    )
  }

  if (!conf.attendingRole) {
    message.channel.send("Set an attending role name. See $nodewar help")
    return
  }
  let role = message.member.guild.roles.find("name", conf.attendingRole)
  if (!role) {
    //Create Role
    console.log("Creating Attending role...")
    message.guild
      .createRole({ name: conf.attendingRole, color: "GREEN" })
      .then(role => message.channel.send(`Created role ${role.name}.`))
      .catch(console.error)
  }
  //=> $nodewar
  if (message.content.startsWith(key.nodewar)) {
    nodewarManager(message, client, nodeWarChannel, role, conf)
  }
  //=>$nwlist
  if (message.content.startsWith(key.list)) {
    Nodewar.listAttendingMembers(message, nodeWarChannel, role, conf)
  }
  //=>$attend
  if (message.content.startsWith(key.attend)) {
    Nodewar.attendNodeWar(message, nodeWarChannel, role)
  }
  //=>$cancel
  if (message.content.startsWith(key.cancel)) {
    Nodewar.cancelNodeWarAttendance(message, nodeWarChannel, role)
  }
}

/**
 * Handle nodewar related commands.
 * @param  {[type]} message    [description]
 * @param  {[type]} client [description]
 * @return {[type]}        [description]
 */
function nodewarManager(message, client, nodeWarChannel, attendingRole, conf) {
  console.log("UPSchan specific $nodewar commands")
  let channel = message.channel
  let node
  let args = message.content
    .slice(1)
    .trim()
    .split(/ +/g)
  let command = args.shift().toLowerCase()
  let firstArg = args[0]
  let secondArg = args[1]
  let thirdArg = args[2]

  console.log(JSON.stringify(args))
  //Help
  if (firstArg === "help") {
    Nodewar.sendHelp(message, client)
    return
  }
  //If only $nodewar is passed we do stuff
  if (args.length == 0) {
    NodewarDB.nodewarCheck(message, nodeWarChannel, attendingRole)
    return
  }
  //If no auth we return early
  if (!Nodewar.canCreateNodeWar(message.member, conf.adminRolesIds)) {
    message.reply("Insufficient permissions, gtfo.")
    return
  }
  //Cancel command
  if (firstArg === "cancel") {
    NodewarDB.cancelNodeWar(message, nodeWarChannel, attendingRole)
    return
  }
  //Win command
  if (firstArg === "win") {
    NodewarDB.endNodeWar(message, nodeWarChannel, attendingRole, firstArg)
    return
  }
  //Loss Command
  if (firstArg === "loss") {
    NodewarDB.endNodeWar(message, nodeWarChannel, attendingRole, firstArg)
    return
  }

  //Message to the slackers.
  if (firstArg === "slacker") {
    Nodewar.messageToSlackers(
      message,
      nodeWarChannel,
      attendingRole,
      args,
      conf
    )
    return
  }

  //Changing NW Channel command
  if (firstArg === "channel" && message.member.permissions.has("ADMINISTRATOR")) {
    let c =
      message.member.guild.channels.find("name", secondArg) ||
      message.member.guild.channels.find("id", thirdArg)
    if (!c) return
    DB.UpdateConfiguration(message.guild, { nodeWarChannel: c.name })
    message.reply("Memewar channel successfully set.")
    return
  }

  //Changing Privileged roles command
  if (firstArg === "role" && message.member.permissions.has("ADMINISTRATOR")) {
    console.log("Updating role")
    let r =
      message.member.guild.roles.find("name", thirdArg) ||
      message.member.guild.roles.find("id", thirdArg)
    if (!r) return
    if (secondArg === "add") {
      DB.UpdateConfigurationArray(message.guild, "adminRolesIds", r.id, false)
      message.reply("Privileged roles successfully added.")
    }
    if (secondArg === "remove") {
      DB.UpdateConfigurationArray(message.guild, "adminRolesIds", r.id, true)
      message.reply("Privileged roles successfully removed.")
    }
    return
  }

  //Assume that firstArg is a date, check if we're authorized to do so & that we have a date
  if (
    Nodewar.canCreateNodeWar(message.member, conf.adminRolesIds) &&
    firstArg
  ) {
    Sugar.Date.setLocale("en-GB")
    let sugarDate = Sugar.Date.create(firstArg)
    let tzDate = moment.tz(sugarDate, timezone)
    if (tzDate.isValid() && !(tzDate.isBefore(Sugar.Date.create("today")))) {
      let formattedDate = tzDate.format("dddd, MMMM Do YYYY")
      message.reply(
        `Well met! Let's do a Memewar on the ${formattedDate}`
      )
      NodewarDB.createNodeWar(message, tzDate)
    } else {
      message.reply("I'm sorry, the date you told me is invalid. :(")
    }
  }
}
