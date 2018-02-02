import * as Messages from "../verbose/messages.js"

import { checkMemberForRolesIds } from "../auth/authorization.js"
import { sendEmbedHelpAsDM } from "../verbose/functions.js"

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
        "- **$nwlist** - list all the participants for the upcoming nodewar.\n- **$nodewar *date*** - creates a nodewar event at the specified date.\n- **$nodewar cancel** - cancel the current nodewar\n- **$nodewar win** - end the current nodewar with a win.\n- **$nodewar loss** - end the current nodewar with a loss.\n- **$nodewar @slacker *message*** - Send a message to everyone who's not attending."
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
    member.permissions.has("ADMINISTRATOR") || checkMemberForRolesIds(member, rolesIds)
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
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
export function attendNodeWar(msg, channel, role) {
  // Assign the role to the member
  msg.member.addRole(role).catch(console.error)
  // Send the message, mentioning the member
  msg.member.user.createDM().then(function(DM) {
    DM.send(Messages.getRandomOkMessage())
  })
  // msg.reply("As you wish.")
  channel.send(msg.member.user.username + " will attend at the upcoming memewar!") // TAG the user
}

/**
 * Cancel an attendance to a NodeWar
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
export function cancelNodeWarAttendance(msg, channel, role) {
  // Remove the role from the member
  msg.member.removeRole(role).catch(console.error)
  // Send the message, mentioning the member
  msg.member.user.createDM().then(function(DM) {
    DM.send(Messages.getRandomOkMessage())
  })
  channel.send(msg.member.user.username + " will not attend! Next time fosure though.")
}

/**
 * List attending members.
 * @param  {[type]} message     [description]
 * @param  {[type]} channel [description]
 * @param  {[type]} role    [description]
 * @return {[type]}         [description]
 */
export function listAttendingMembers(message, channel, role, conf) {
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
      `**Here's a list of everyone who's attending to the upcoming nodewar :**\n ${nameList} \n That is a total of **${
        nwlist.size
      }** people.`
    )
  } else {
    message.channel.send("There are no participants for the upcoming nodewar yet.")
  }
}

export function messageToSlackers(message, attendingRole, args, conf) {
  if (!canCreateNodeWar(message.member, conf.adminRolesIds)) {
    message.reply("You wish.")
    return
  }
  let text = args
  text.splice(0, 1)
  const slackers = message.guild.members
    .filter(member => {
      // console.log(member.roles) member.roles.some(r => rolesIds.includes(r.id)
      return member.roles.some(role => role.id == attendingRole.id)
    })
    .map(member => `<@${member.user.id}>,`)
  message.channel.send(
    `**From <@${message.member.user.id}> :** ${slackers.join(" ")} **${text.join(" ")}**`
  )
}
