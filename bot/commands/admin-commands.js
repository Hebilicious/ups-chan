import { isPrivileged } from "../auth/authorization.js"
import * as DB from "../database/database.js"
/**
 * List Emojis the bot has access to.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */
export async function listEmojis(message, client) {
  if (message.content === "$listEmojis") {
    let permission = await isPrivileged(message.member)
    if (!permission) {
      return
    }
    console.log("LISTING EMOJIS")
    const emojiList = client.emojis.map(
      e => `${client.emojis.get(e.id)} **Name:** ${e.name}, **Identifier:** ${e.identifier}, **ID:** ${e.id}`
    )
    message.channel.send(emojiList.join("\n"), { split: true })
  }
}

/**
 * List Emojis the bot has access to.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */
export async function listChannels(message, client) {
  if (message.content === "$listChannels") {
    let permission = await isPrivileged(message.member)
    if (!permission) {
      message.channel.send("Insufficient permissions")
      return
    }
    console.log("LISTING CHANNELS")
    const channelList = message.member.guild.channels.map(
      c => `**$Name**: ${c.name}, **Type**: ${c.type}, **ID:** ${c.id}`
    )
    message.channel.send(channelList.join("\n"), { split: true })
  }
}

/**
 * List channels the bot has access to.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */
export async function listRoles(message, client) {
  if (message.content === "$listRoles") {
    let permission = await isPrivileged(message.member)
    if (!permission) {
      message.channel.send("Insufficient permissions")
      return
    }
    console.log("LISTING ROLES")
    const roleList = message.member.guild.roles.map(
      r => `**$Name:** ${r.name}, **Members:** ${r.members.size}, **ID:** ${r.id}`
    )
    message.channel.send(roleList.join("\n"), { split: true })
  }
}

export async function dumpConf(message, client) {
  if (message.content === "$getConfiguration") {
    let permission = await isPrivileged(message.member)
    if (!permission) {
      message.channel.send("Insufficient permissions")
      return
    } 
    console.log("DUMPING CONFIGURATION")
    DB.Connect(message.guild)
      .table("configuration")
      .get(0)
      .then(conf =>
        message.channel.send(
          "Current configuration :" + JSON.stringify(conf, null, 4)
        )
      )
  }
}

export async function fixDB(message, client) {
  if (message.content === "$fixServerNameDB") {
    let app = await client.fetchApplication();
    if (app.owner.id == message.author.id) {
      console.log("FIXING DATABASE");
      DB.addServerNametoDB(client);
      message.reply("Done fixing the DB");
    } else {
      message.channel.send("Nice try, now gtfo");
    }
  }
}
