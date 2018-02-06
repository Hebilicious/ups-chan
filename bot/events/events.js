import * as DB from "../database/database.js"

/**
 * A base event class with some prototype methods.
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
 */
export class guildMemberUpdate extends Event {
  constructor() {
    super()
    console.log("guildMemberUpdate ready")
    this.eventName = "guildMemberUpdate"
    Array.prototype.diff = function (array) {
      return this.filter(x => !array.includes(x))
    }
  }

  async handleEvent(client, oldM, newM) {
    console.log("Handling " + this.eventName)

    const conf = await DB.Connect(oldM.guild)
      .table("configuration")
      .get(0)
      .run()

    let oldRoles = oldM.roles.map(r => r.name)
    let newRoles = newM.roles.map(r => r.name)
    let ignore = []
    ignore.push(conf.attendingRole)
    let removed = oldRoles.diff(newRoles).diff(ignore)
    let added = newRoles.diff(oldRoles).diff(ignore)
    let channel = oldM.guild.channels.find("name", "general")
    if (!channel) return
    console.log(`Added ${added}, removed ${removed}`)
    if (removed.length > 0) {
      channel.send(
        `${oldM.displayName} is no longer **${removed.toString()}**.`
      )
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

    // Send :heartpulse: randomly on reactions
    // let randomly = Math.floor(Math.random() * 3)
    // if (user.id != client.user.id && randomly == 1) {
    //   messageReaction.message.react("💗")
    // }

    //Send LUL when LUL
    const lul = messageReaction.message.guild.emojis.find("name", "LUL")
    if (messageReaction.emoji == lul) {
      console.log("Found specific reaction")
      messageReaction.message.react(lul)
    }
  }
}
