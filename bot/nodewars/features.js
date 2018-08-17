import * as Messages from "../verbose/messages.js"

import { checkMemberForRolesIds } from "../auth/authorization.js"
import { sendEmbedHelpAsDM } from "../verbose/functions.js"
import { isNodeWarActive } from "./db.js"
 
/**
 * Send Nodewar Help.
 * @param {Message} message
 * @param {Client} client
 */
export function sendHelp(message, client) {
  const fields = [
    {
      name: "__Nodewar commands__",
      value:
        "- **$attend** - set your role to *Attending*.\n- **$cancel** - remove yourself from the *Attending* list.\n- **$nodewar** - tells you the date for the the upcoming nodewar."
    },
    {
      name: "__Nodewar administrator commands__",
      value:
        "- **$nwlist** - list all the participants for the upcoming nodewar.\n- **$nodewar *date*** - creates a nodewar event at the specified date.\n- **$nodewar cancel** - cancel the current nodewar\n- **$nodewar win** - end the current nodewar with a win.\n- **$nodewar loss** - end the current nodewar with a loss.\n- **$nodewar slacker *message*** - Send a message to everyone who's not attending."
    },
    {
      name: "__ServerAdmin Nodewar commands__",
      value:
        "- **$nodewar channel *channelName*** - Change the nodewar channel used by UPS-chan.\n- **$nodewar role add *roleName*** - Add a role to the authorized nodewar roles.\n- **$nodewar role remove *roleName*** - Remove a role from the authorized nodewar roles."
    }
  ]
  sendEmbedHelpAsDM(message, client, fields)
}
/**
 * Check if a member can create a nodewar
 * @param  {[type]} member [description]
 * @return {[type]}        [description]
 */
export function canCreateNodeWar(member, rolesIds) {
  console.log("is admin ? : " + member.permissions.has("ADMINISTRATOR"))
  console.log("roles Ids :" + rolesIds.toString())
  return (
    member.permissions.has("ADMINISTRATOR") ||
    checkMemberForRolesIds(member, rolesIds)
  )
}

/**
 * Clear the attending members.
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
export function clearAttendingMembers(message, channel, role) {
  message.member.guild.roles
    .find("name", role.name)
    .members.forEach(member => member.removeRole(role).catch(console.error))
  message.channel.send(`The attending roles have been correctly removed.`)
}

/**
 * Attend a Nodewar
 * @param  {[type]} message [description]
 * @return {[type]}     [description]
 */
export async function attendNodeWar(message, channel, role) {
  let active = await isNodeWarActive(message)
  if (!active) {
    channel.send("There's no active Memewar.")
    return
  }
  // Assign the role to the member
  message.member
    .addRole(role)
    .then(r => updateParticipantTopic(message, channel, role))
    .catch(console.error)
  channel.send(
    message.member.user.username + " will attend in the upcoming Memewar!"
  )
}

/**
 * Cancel an attendance to a NodeWar
 * @param  {[type]} message [description]
 * @return {[type]}     [description]
 */
export async function cancelNodeWarAttendance(message, channel, role) {
  let active = await isNodeWarActive(message)
  if (!active) {
    channel.send("There's no active Memewar.")
    return
  }
  // Remove the role from the member
  message.member
    .removeRole(role)
    .then(r => updateParticipantTopic(message, channel, role))
    .catch(console.error)
  channel.send(
    message.member.user.username + " will not attend! Next time fosure though."
  )
}

/**
 * Add / Edit the number of participants to the Nodewar string.
 * @param {Message} message
 * @param {Channel} channel Nodewar Channel
 * @param {Role} role Attending role.
 */
export function updateParticipantTopic(message, channel, role) {
  let totalMembers = message.guild.members.filter(member => {
    if (member.roles.map(r => r.id).includes(role.id)) {
      return member
    }
  })
  let topic = channel.topic
  let cleanTopic = topic.substring(0, topic.indexOf("!") + 1)
  channel.setTopic(`${cleanTopic} Participants : ${totalMembers.size}`)
}
/**
 * List attending members.
 * @param  {Message} message     [description]
 * @param  {Channel} channel [description]
 * @param  {Role} role    [description]
 */
export async function listAttendingMembers(message, channel, role, conf) {
  // First check if there is an upcoming nodewar
  let active = await isNodeWarActive(message)
  if (!active) {
    channel.send("There's no active Memewar.")
    return
  }
  //Check for roles
  //If no auth we return early
  if (!canCreateNodeWar(message.member, conf.adminRolesIds)) {
    message.reply("Ask one of your overlords.")
    return
  }
  // Assign the cached members of the role 'Attending' to the variable
  let nwlist = message.member.guild.roles.find("name", role.name).members
  // Send the message, mentioning the member
  let nameList = []
  nwlist.forEach(m => nameList.push("- " + m.displayName))
  console.log(nameList)
  nameList = nameList.join("\n ")
  if (nwlist.size > 0) {
    message.channel.send(
      `**Here's a list of everyone who's attending to the upcoming Memewar :**\n ${nameList} \n That is a total of **${
        nwlist.size
      }** people.`
    )
  } else {
    message.channel.send(
      "There are no participants for the upcoming Memewar yet."
    )
  }
}

/**
 * Send a message to all the slackers in the nodewar channel.
 * @param {Message} message
 * @param {Channel} channel
 * @param {Role} attendingRole
 * @param {Array} args Argument from the command.
 * @param {Object} conf Configuration of the current guild.
 */
export function messageToSlackers(message, channel, attendingRole, args, conf) {
  if (!canCreateNodeWar(message.member, conf.adminRolesIds)) {
    message.reply("You wish.")
    return
  }
  let text = args
  text.splice(0, 1)
  const slackers = channel.members
    .filter(member => {
      if (!member.roles.map(r => r.id).includes(attendingRole.id)) {
        return member
      }
    })
    .map(member => `<@${member.user.id}>,`)
  channel.send(
    `**From <@${message.member.user.id}> :** ${slackers.join(
      " "
    )} **${text.join(" ")}**`
  )
}
