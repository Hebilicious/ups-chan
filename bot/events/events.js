/**
 * A base event class with some prototype methods.
 */
class Event {
  constructor() {
    this.instantiate()
  }

  instantiate() {
    console.log("Event instancied")
    Array.prototype.diff = function(array) {
      return this.filter(x => !array.includes(x))
    }
  }
}

/**
 * Outputs something on a role change.
 * @param  {[type]} oldM [description]
 * @param  {[type]} newM [description]
 * @return {[type]}      [description]
 */
export class guildMemberUpdate extends Event {
  constructor() {
    super()
    console.log("guildMemberUpdate ready")
    this.eventName = "guildMemberUpdate"
  }

  handleEvent(client, oldM, newM) {
    console.log("Handling " + this.eventName)

    let oldRoles = oldM.roles.map(r => r.name)
    let newRoles = newM.roles.map(r => r.name)
    let ignore = ["Attending"]
    let removed = oldRoles.diff(newRoles).diff(ignore)
    let added = newRoles.diff(oldRoles).diff(ignore)
    let channel = oldM.guild.channels.find("name", "general")
    console.log(`Added ${added}, removed ${removed}`)
    if (removed.length > 0) {
      channel.send(`${oldM.displayName} is no longer **${removed.toString()}**.`)
    }
    if (added.length > 0) {
      channel.send(`${oldM.displayName} is now **${added.toString()}**.`)
    }
  }
}

export class messageReactionAdd extends Event {
  constructor() {
    super()
    console.log("messageReactionAdd ready")
    this.eventName = "messageReactionAdd"
  }

  handleEvent(client, messageReaction, user) {
    if (user.client != client) {
      messageReaction.message.react("💗")
    }
  }
}
