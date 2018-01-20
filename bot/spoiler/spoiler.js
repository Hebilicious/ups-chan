import {GifGenerator} from "./gifgenerator.js"
import {getRandomDontSpoilMessage} from "../verbose/messages.js"

const fs = require("fs")

/**
 * Inspired by @TimboKZ https://github.com/TimboKZ/discord-spoiler-bot/
 */

/**
 * Class for a spoiler.
 * @param {DiscordMessage} message
 * @param {string} topic
 * @param {string} content
 */
class Spoiler {
  constructor(message, topic, content) {
    this.message = message
    this.topic = topic
    this.content = content
  }
}

/**
 * Handle the spoiler syntax and spoil the content.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */
export function spoilThisContent(message, client) {
  if (message.content.match(/^.+\$spoiler.+$/)) {
    console.log("Spoiler")
    let parts = message.content.split("$spoiler")
    let spoiler = new Spoiler(message, parts[0], parts[1])
    message.delete()
    message.channel.send(`**${getRandomDontSpoilMessage()}**`).then(m => {
      setTimeout(() => {
        m.delete()
      }, 3000)
    })

    // message.channel.send("New content")
    printSpoiler(spoiler)
  }
}

/**
 * Print a Spoiler message.
 * @param  {Class} spoiler [Must be a spoiler class]
 */
function printSpoiler(spoiler) {
  let messageContent = `**${spoiler.topic}** spoiler`
  let maxLines = 30
  const g = new GifGenerator()
  g.createSpoilerGif(spoiler, maxLines, filePath => {
    sendFile(spoiler.message, filePath, "spoiler.gif", messageContent, () => {
      console.log("Deleting The Gif")
      fs.unlink(
        filePath,
        err => (err ? console.error(`Could not remove GIF: ${err}`) : null)
      )
    })
  })
}

/**
 * Reply to a message with a file.
 * @param  {DiscordjsMessage}   message  [description]
 * @param  {String}   filePath [description]
 * @param  {String}   fileName [description]
 * @param  {String}   content  [description]
 * @param  {Function} done     Callback
 */
function sendFile(message, filePath, fileName, content, done) {
  let options = {
    files: [
      {
        attachment: filePath,
        name: fileName
      }
    ]
  }
  message
    .reply(content, options)
    .then(() => done())
    .catch(error => console.log(`Error sending file: ${error}`))
}
