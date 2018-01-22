import moment from "moment-timezone"
import {clearAttendingMembers} from "./features.js"
import * as Messages from "../verbose/messages.js"

const r = require("rethinkdbdash")({db: "test"})
const timezone = "Europe/Paris"

/**
 * End a nodewar
 * @param  {[Object]} message [The initial message]
 * @param  {[Object]} channel [The Nodewar channel]
 * @param  {[Object]} role    [The Attending Role]
 * @param  {[String]} result  [Win or Loss]
 * @return {[type]}         [description]
 */
export function endNodeWar(message, channel, role, result) {
  //1.Fetch the current nodewar.
  //2. Update it with the results
  //3. Clear the attendingmembers.
  let victory
  if (result == "win") {
    victory = true
  }
  if (result == "loss") {
    victory = false
  }
  let updatedNW = {
    isActive: false,
    victory: victory,
    attendingMembers: message.member.guild.roles
      .find("name", role.name)
      .members.map(m => m.user.id)
  }
  r

    .table("nodewar")
    .filter({isActive: true})
    .update(updatedNW)
    .run()
    .then((err, result) => {
      if (err) throw err
      console.log(JSON.stringify(result, null, 2))
      if (victory) {
        message.channel.send(Messages.getRandomWinMessage())
        setNodewarTopic(message, "EZ game EZ win EZ")
      } else {
        message.channel.send(Messages.getRandomLossMessage())
        setNodewarTopic(message, "We got unlucky.")
      }
      clearAttendingMembers(message, channel, role)
    })
}

/**
 * Cancel a nodewar event
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
export function cancelNodeWar(message, channel, role) {
  r

    .table("nodewar")
    .filter({isActive: true})
    .delete()
    .run()
    .then((err, result) => {
      if (err) throw err
      console.log(JSON.stringify(result, null, 2))
      message.reply(`NodeWar successfully canceled.`)
      setNodewarTopic(message, "UPS will prevail soon.")
      clearAttendingMembers(message, channel, role)
    })
}

/**
 * Write a nodewar event to the filesystem.
 * @param  {[type]} message [description]
 * @param  {[type]} date    [description]
 * @return {[type]}         [description]
 */
export function createNodeWar(message, date) {
  console.log("Trying to create a nodewar...")
  let endDate = date.add({hours: 10, minutes: 30})
  let fDate = date.format("dddd, MMMM Do YYYY")
  let nwObject = {
    isActive: true,
    victory: false,
    date: date.format(),
    createdAt: moment.tz(moment(), timezone).format(),
    creatorId: message.member.id,
    attendingMembers: 0
  }
  r
    .table("nodewar")
    .filter({isActive: true})
    .run()
    .then(result => {
      if (result.length == 1) {
        updateCurrentNodeWar(nwObject)
        message.reply(`Modified the current Nodewar.`)
        setNodewarTopic(message, `Nodewar => ${fDate} !`)
      }
      if (result.length == 0) {
        insertNewNodeWar(nwObject)
        message.reply("New nodewar created !")
        setNodewarTopic(message, `Nodewar => ${fDate} !`)
      }
      if (result.length > 1) {
        message.reply("DB ERROR, need to be resynced.")
      }
    })
}

/**
 * Initiate the async sequence for answering to $nodewar
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
export function nodewarCheck(message) {
  checkIfTableExists(message)
}

//Update a node war
function updateCurrentNodeWar(nwObject) {
  r

    .table("nodewar")
    .filter({isActive: true})
    .update({date: nwObject.date})
    .run()
    .then((err, result) => {
      if (err) throw err
      console.log(JSON.stringify(result, null, 2))
    })
  console.log("Updated nodewar.")
}

//Insert a node war
function insertNewNodeWar(conn, nwObject) {
  r

    .table("nodewar")
    .insert(nwObject)
    .run()
    .then((err, result) => {
      if (err) throw err
      console.log(JSON.stringify(result, null, 2))
    })
  console.log("Created nodewar")
}

//Create nodewar table if we don't have it, then fetch the active nodewar.
function checkIfTableExists(message) {
  r
    .tableList()
    .run()
    .then(function(result) {
      console.log(result)
      if (result.includes("nodewar")) {
        console.log("We got nodewar")
        fetchActiveNodewar(message)
      } else {
        console.log("We create nodewar")
        r
          .tableCreate("nodewar")
          .run()
          .then(function(result) {
            console.log(result)
            fetchActiveNodewar(message)
          })
      }
    })
}

//fetch the active nodewar, then respond to the message based on the result.
function fetchActiveNodewar(message) {
  console.log("Hello")
  r
    .table("nodewar")
    .filter({isActive: true})
    .run()
    .then(function(result) {
      console.log(result)
      console.log("fetchActiveNodewar result")
      respondNodewar(message, result)
    })
}

//The actual response sent by the bot.
function respondNodewar(message, result) {
  console.log(message.member)
  if (result.length == 1) {
    let fDate = moment(result[0].date).format("dddd, MMMM Do YYYY")
    setNodewarTopic(message, `Nodewar => ${fDate} !`)
    message.reply(`Nodewar scheduled for ${fDate}.`)
  } else {
    message.reply("When would you like to create a nodewar?")
  }
}

//Set the topic for the nw channel
function setNodewarTopic(message, topic) {
  console.log("Setting topic")
  const nodeWarChannel = message.member.guild.channels.find("name", "memewar-discussion")
  nodeWarChannel.setTopic(topic)
}
