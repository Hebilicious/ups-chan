/**
 * Outputs something on a role change.
 * @param  {[type]} oldM [description]
 * @param  {[type]} newM [description]
 * @return {[type]}      [description]
 */
export function memberUpdate(oldM, newM) {
  console.log("Member updated")
  let oldRoles = oldM.roles.map(r => r.name)
  let newRoles = newM.roles.map(r => r.name)
  let ignore = ["Attending"]
  Array.prototype.diff = function(array) {
    return this.filter(x => !array.includes(x))
  }
  let removed = oldRoles.diff(newRoles).diff(ignore)
  let added = newRoles.diff(oldRoles).diff(ignore)
  let channel = oldM.guild.channels.find("name", "general")
  console.log(`Added ${added}, removed ${removed}`)
  if (removed.length > 0) {
    channel.send(`${oldM.displayName} is no longer **${removed.toString()}**`)
  }
  if (added.length > 0) {
    channel.send(`${oldM.displayName} is now **${added.toString()}**`)
  }
}
