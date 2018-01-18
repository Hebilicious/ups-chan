/**
 * Check if a member has specifics ids;
 * @param  {[type]} member [description]
 * @return {[type]}        [description]
 */
export function canCreateNodeWar(member, rolesIds) {
  console.log("Can you ?")
  return member.roles.some(r => rolesIds.includes(r.id)) ? true : false
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
    DM.send(getRandomOkMessage())
  })
  // msg.reply("As you wish.")
  channel.send(
    msg.member.user.username + " will attend at the upcoming memewar!"
  ) // TAG the user
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
    DM.send(getRandomOkMessage())
  })
  channel.send(
    msg.member.user.username + " will not attend! Next time fosure though."
  )
}

function getRandomOkMessage() {
  const messages = [
    "As you wish.",
    "Your will, my hands.",
    "Your wishes, my commands.",
    "At your service.",
    "Of course master.",
    "I obey.",
    "I'm yours to command.",
    "Anything to please you my lord.",
    "Yes please daddy.",
    "Oh ye that's the spot baby...",
    "I heard lib is a woman, is that true ?? Uh I'm sorry that's the wrong message !! I meant : Yes master.",
    "Without hesitation.",
    "Yes master.",
    "Right away sir.",
    "Sir, yes sir.",
    "Rush b cyka blyat.. *enables english* Yes mylord."
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}
