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
    const emojiList = client.emojis.map(e => `Name: ${e.name}, Identifier: ${e.identifier}, ID: ${e.id}`);
    Meeseeks.superSplit(emojiList, 1000).forEach(el => message.channel.send(el.toString()) 
  }
}
