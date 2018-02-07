import moment from "moment-timezone"

import * as Messages from "../verbose/messages.js"
import * as DB from "../database/database.js"

import { clearAttendingMembers, updateParticipantTopic } from "./features.js"
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
  DB.Connect(message.guild)
    .table("nodewar")
    .filter({ isActive: true })
    .update(updatedNW)
    .run()
    .then(result => {
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
  console.log("Cancelling nodewar...")
  console.log(role)
  DB.Connect(message.guild)
    .table("nodewar")
    .filter({ isActive: true })
    .delete()
    .run()
    .then(result => {
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
  let endDate = date.add({ hours: 10, minutes: 30 })
  let fDate = date.format("dddd, MMMM Do YYYY")
  let nwObject = {
    isActive: true,
    victory: false,
    date: date.format(),
    createdAt: moment.tz(moment(), timezone).format(),
    creatorId: message.member.id,
    attendingMembers: 0
  }
  DB.Connect(message.guild)
    .table("nodewar")
    .filter({ isActive: true })
    .run()
    .then(result => {
      if (result.length == 1) {
        updateCurrentNodeWar(nwObject, message)
        message.reply(`Modified the current Nodewar.`)
        setNodewarTopic(message, `Nodewar => ${fDate} !`)
      }
      if (result.length == 0) {
        insertNewNodeWar(nwObject, message)
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
export function nodewarCheck(message, chanel, role) {
  console.log("Hello")
  DB.Connect(message.guild)
    .table("nodewar")
    .filter({ isActive: true })
    .run()
    .then(result => {
      console.log("fetchActiveNodewar result")
      respondNodewar(message, chanel, role, result)
    })
}

/**
 * Check if we have an active nodewar.
 * @param  {Message} message [description]
 * @return {Boolean}         [description]
 */
export async function isNodeWarActive(message) {
  let activeNw = await DB.Connect(message.guild)
    .table("nodewar")
    .filter({ isActive: true })
  activeNw.length == 1 ? true : false
}

//Update a node war
function updateCurrentNodeWar(nwObject, message) {
  DB.Connect(message.guild)
    .table("nodewar")
    .filter({ isActive: true })
    .update({ date: nwObject.date })
    .run()
    .then(result => {
      console.log(JSON.stringify(result, null, 2))
    })
  console.log("Updated nodewar.")
}

//Insert a node war
function insertNewNodeWar(nwObject, message) {
  DB.Connect(message.guild)
    .table("nodewar")
    .insert(nwObject)
    .run()
    .then(result => {
      console.log(JSON.stringify(result, null, 2))
    })
  console.log("Created nodewar")
}

//The actual response sent by the bot.
function respondNodewar(message, channel, role, result) {
  if (result.length == 1) {
    let fDate = moment(result[0].date).format("dddd, MMMM Do YYYY")
    setNodewarTopic(message, `Nodewar => ${fDate} !`).then(r => updateParticipantTopic(message, channel, role))

    message.reply(`Nodewar scheduled for ${fDate}.`)
  } else {
    message.reply("When would you like to create a nodewar?")
  }
}

//Set the topic for the nw channel
async function setNodewarTopic(message, topic) {
  console.log("Setting topic")
  const conf = await DB.Connect(message.guild)
    .table("configuration")
    .get(0)
    .run()
  const nodeWarChannel = message.member.guild.channels.find(
    "name",
    conf.nodeWarChannel
  )
  return nodeWarChannel.setTopic(topic)
}
