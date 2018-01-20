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
      e => `Name: ${e.name}, Identifier: ${e.identifier}, ID: ${e.id}`
    )
    console.log(emojiList)
    Meeseeks.superSplit(emojiList, 500).forEach(el => message.channel.send(el.toString()))
  }
}

let mock =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus sapien augue, eget malesuada elit pretium rutrum. Nunc commodo enim non vestibulum aliquet. Maecenas tristique ultrices velit sit amet aliquam. Nam in eros arcu. Donec quis efficitur nulla. Vivamus id bibendum diam. Praesent ut lobortis sem. Nulla non ligula ex. Sed aliquet, neque a tincidunt euismod, tortor augue mollis quam, non sodales erat eros eget odio. Ut eu diam tristique, efficitur neque eu, consequat libero. Nulla tempor orci eu nisi tincidunt, vitae laoreet justo placerat. Nulla sed magna id orci gravida fringilla. Aenean elementum, est nec pharetra euismod, justo lectus consectetur arcu, in cursus risus ex et erat."
