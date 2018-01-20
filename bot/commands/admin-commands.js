import * as Meeseeks from "../helpers.js"

/**
 * List Emojis the bot has access to.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */
export function listEmojis(message, client) {
  if (message.content === "$listEmojis") {
    console.log("listing emojis")
    const emojiList = client.emojis.map(
      e =>
        `**${client.emojis.get(e.id)} Name**: ${e.name}, **Identifier**: ${
          e.identifier
        }, **ID:** ${e.id}`
    )

    let toSend = Meeseeks.superSplit(emojiList.join("\n"), 2000)
    message.channel.send(emojiList.join("\n"), { split: true })
    // console.log(toSend);
    // emojiList.forEach(el => message.channel.send(el, { split: true }))
    // Meeseeks.superArraySplit(Array(50).fill(mock), 500).forEach(el => console.log(el))
  }
}

/**
 * List Emojis the bot has access to.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */
export function listChannels(message, client) {
  if (message.content === "$listChannels") {
    console.log("listing channels")
    const channelList = message.member.guild.channels
      .sort((a, b) => {
        a.position - b.position
      })
      .map(
        c => `${c.position} - **$Name**: ${c.name}, **Type**: ${c.type}, **ID:** ${c.id}`
      )
    message.channel.send(channelList.join("\n"), { split: true })
  }
}

/**
 * List Emojis the bot has access to.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */
export function listRoles(message, client) {
  if (message.content === "$listRoles") {
    console.log("listing roles")
    const roleList = message.member.guild.roles
      .sort((a, b) => {
        a.calculatedPosition - b.calculatedPosition
      })
      .map(
        r =>
          `${r.calculatedPosition} - **$Name**: ${r.name}, **Members**: ${
            r.members.size
          }, **ID:** ${r.id}`
      )
    message.channel.send(channelList.join("\n"), { split: true })
  }
}
