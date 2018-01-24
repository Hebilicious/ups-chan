/**
 * A base event class.
 */
class Event {
  constructor() {
    this.instantiate()
  }

  instantiate() {
    console.log("Event instancied")
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
    Array.prototype.diff = function(array) {
      return this.filter(x => !array.includes(x))
    }
    //Mapping role names
    let oldRoles = oldM.roles.map(r => r.name)
    let newRoles = newM.roles.map(r => r.name)
    //Ignored roles
    let ignore = ["Attending"]
    //Channel
    let channel = oldM.guild.channels.find("name", "general")
    let removed = oldRoles.diff(newRoles).diff(ignore)
    let added = newRoles.diff(oldRoles).diff(ignore)
    console.log(`Added ${added}, removed ${removed}`)
    if (removed.length > 0) {
      channel.send(`${oldM.displayName} is no longer **${removed.toString()}**.`)
    }
    if (added.length > 0) {
      channel.send(`${oldM.displayName} is now **${added.toString()}**.`)
    }
  }
}

/**
 * React to stuff
 * @type {String}
 */
export class messageReactionAdd extends Event {
  constructor() {
    super()
    console.log("messageReactionAdd ready")
    this.eventName = "messageReactionAdd"
  }

  handleEvent(client, messageReaction, user) {
    const emojiKey = messageReaction.emoji.id
      ? `${messageReaction.emoji.name}:${messageReaction.emoji.id}`
      : messageReaction.emoji.name

    // Send :heartpulse: to everyone
    if (user.id != client.user.id) {
      messageReaction.message.react("💗")
    }

    //Send LUL when LUL
    const lul = messageReaction.message.guild.emojis.find("name", "LUL")
    if (messageReaction.emoji == lul) {
      console.log("Found specific reaction")
      messageReaction.message.react(lul)
    }
  }
}
