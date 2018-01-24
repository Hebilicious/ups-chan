import moment from "moment-timezone"
import Sugar from "sugar"
import rethink from "rethinkdb"
import * as Nodewar from "./features.js"
import * as NodewarDB from "./db.js"
import * as DB from "./database/database.js"
import { sendEmbedHelpAsDM } from "../verbose/functions.js"

// const schedule = require("node-schedule")

const timezone = "Europe/Paris"
//Mom&Dad,WeebOverlords,Lider,Test

/**
 * NodeWar Handler
 * @param  {[type]} msg    [description]
 * @param  {[type]} client [description]
 * @return {[type]}        [description]
 */
export function handleNodeWar(msg, client) {
  const keynodewar = "$nodewar"
  const keylist = "$nwlist"
  const keyattend = "$attend"
  const keycancel = "$cancel"
  //Find the name of the nodewar channel for the guild
  //Find the name of the Attending role and create it if it doesn't exist
  DB.connect(guild)
    .table("configuration")
    .get(0)
    .then(result => {
      const conf = result
    })
  const nodeWarChannel = conf.nodeWarChannel
    ? msg.member.guild.channels.find("name", conf.nodeWarChannel)
    : askForChannel() // Must Return a channel

  const attendingRole = conf.attendingRole
    ? msg.member.guild.roles.find("name", conf.attendingRole)
    : askForAttending() //Must return a role

  if (!nodeWarChannel || !attendingRole) return
  if (msg.content.startsWith(keynodewar)) {
    nodewarManager(msg, client, nodeWarChannel, attendingRole)
  }
  if (msg.content.startsWith(keylist)) {
    listAttendingMembers(msg, nodeWarChannel, attendingRole)
  }
  if (msg.content.startsWith(keyattend)) {
    Nodewar.attendNodeWar(msg, nodeWarChannel, attendingRole)
  }
  if (msg.content.startsWith(keycancel)) {
    Nodewar.cancelNodeWarAttendance(msg, nodeWarChannel, attendingRole)
  }
}

function askForChannel() {
  console.log("Asking for channel")
}
function askForRole() {
  console.log("Asking for role")
}

/**
 * Handle nodewar related commands.
 * @param  {[type]} msg    [description]
 * @param  {[type]} client [description]
 * @return {[type]}        [description]
 */
function nodewarManager(msg, client, nodeWarChannel, attendingRole) {
  console.log("UPSchan specific $nodewar commands")
  let channel = msg.channel
  let args = msg.content
    .slice(1)
    .trim()
    .split(/ +/g)
  let command = args.shift().toLowerCase()
  let firstArg = args[0]

  console.log(JSON.stringify(args))
  //Help
  if (firstArg === "help") {
    const fields = [
      {
        name: "__Nodewar commands__",
        value:
          "- **$attend** - set your role to *Attending*.\n- **$cancel** - remove yourself from the *Attending* list.\n- **$nodewar** - tells you the date for the the upcoming nodewar."
      },
      {
        name: "__Admin Nodewar commands__",
        value:
          "- **$nwlist** - list all the participants for the upcoming nodewar.\n- **$nodewar *date*** - creates a nodewar event at the specified date.\n- **$nodewar cancel** - cancel the current nodewar\n- **$nodewar win** - end the current nodewar with a win.\n- **$nodewar loss** - end the current nodewar with a loss."
      }
    ]
    sendEmbedHelpAsDM(msg, client, fields)
    return
  }
  //If no auth we return early
  if (!Nodewar.canCreateNodeWar(msg.member)) {
    msg.reply("Gtfo scrub.")
    return
  }
  //If only $nodewar is passed we do stuff
  if (args.length == 0) {
    NodewarDB.nodewarCheck(msg)
    return
  }

  //Cancel command
  if (firstArg === "cancel") {
    NodewarDB.cancelNodeWar(msg, nodeWarChannel, attendingRole)
    return
  }
  //Win command
  if (firstArg === "win") {
    console.log("VI VON ZULUL")
    NodewarDB.endNodeWar(msg, nodeWarChannel, attendingRole, firstArg)
    return
  }
  //Loss Command
  if (firstArg === "loss") {
    console.log("We lost")
    NodewarDB.endNodeWar(msg, nodeWarChannel, attendingRole, firstArg)
    return
  }
  //Assume that firstArg is a date, check if we're authorized to do so & that we have a date
  if (Nodewar.canCreateNodeWar(msg.member) && firstArg) {
    Sugar.Date.setLocale("en-GB")
    let sugarDate = Sugar.Date.create(firstArg)
    let tzDate = moment.tz(sugarDate, timezone)
    if (tzDate.isValid()) {
      msg.reply(
        `Well met! Let's do a nodewar on the ${tzDate.format("dddd, MMMM Do YYYY")}`
      )
      NodewarDB.createNodeWar(msg, tzDate)
    } else {
      msg.reply("I'm sorry, the date you told me is invalid. :(")
    }
  }
}

/**
 * List attending members.
 * @param  {[type]} msg     [description]
 * @param  {[type]} channel [description]
 * @param  {[type]} role    [description]
 * @return {[type]}         [description]
 */
function listAttendingMembers(msg, channel, role) {
  //Check for roles
  //If no auth we return early
  if (!Nodewar.canCreateNodeWar(msg.member)) {
    msg.reply("Ask one of your overlords.")
    return
  }
  // Assign the cached members of the role 'Attending' to the variable
  let nwlist = msg.member.guild.roles.find("name", role.name).members
  // Send the message, mentioning the member
  let nameList = []
  nwlist.forEach(m => nameList.push("- " + m.displayName))
  console.log(nameList)
  nameList = nameList.join("\n ")
  if (nwlist.size > 0) {
    msg.channel.send(
      `**Here's everyone attending the upcoming nodewar :**\n ${nameList} \n That is a total of **${
        nwlist.size
      }** people.`
    )
  } else {
    msg.channel.send("There are no participants for the upcoming nodewar yet.")
  }
}
