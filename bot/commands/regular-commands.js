import moment from "moment-timezone"
import { sendEmbedHelpAsDM } from "../verbose/functions.js"
import { getRandomMeeseeksInteraction } from "../verbose/messages.js"
const timezone = "Europe/Paris"

// /**
//  * Talks to Mr meeseeks.
//  * @param {Message} message
//  * @param {Client} client
//  */
// export function meeseeksAnswer(message, client) {
  if (message.author.id == "159985870458322944") { /* Mee6 BotID */
//     message.channel.send(getRandomMeeseeksInteraction()).then(m => {
//       setTimeout(() => {
//         m.delete()
//       }, 2500)
//     })
//   }
// }

/**
    troll: "Troll Quint"
 * Be proud of yourself.
 * @param {Message} message
 * @param {Client} client
 */
export function ups(message, client) {
  const regex = /(\bups\b)+/gim
  let randomly = Math.floor(Math.random() * 4)
  if (regex.test(message.content) && randomly == 1) {
    message
      .react("🇺")
      .then(() => message.react("🇵"))
      .then(() => message.react("🇸"))
      .then(() => {
        const emoji = message.guild.emojis.find("name", "PagChomp")
        message.react(emoji)
      })
      .catch(() => console.error("One of the emojis failed to react."))
  }
}

/**
 * Alzy easter egg.
 * @param {Message} message
 */
export function secretAlzy(message) {
  if (message.content === "alzy") {
    console.log("Alzy !!")
    // Send the message to a designated channel on a server:
    const channel = message.member.guild.channels.find(
      "name",
      "drama-super-important-and-private-stuff"
    )
    console.log(channel)
    // Do nothing if the channel wasn't found on this server
    if (!channel) return
    // Send the message, mentioning the member
    channel.send(
      `https://cdn.discordapp.com/attachments/318482214071566336/402574859013455873/roar.PNG`
    )
  }
}

/**
//  * Expect grammar.
//  * @param {Message} message
//  */
// export function grammar(message) {
//   const ex = ["execpt", "exectp", "excpet", "excetp", "except", "excpect"]
//   if (ex.some(w => message.content.includes(w))) {
    message.reply("Expect. Expecting.")
//   }
// }

/**
 * Send the help.
 * @param {Message} message
 * @param {Client} client
 */
export function help(message, client) {
  if (message.content === "$help") {
    const fields = [
      {
        name: "__Commands__",
        value:
          "- **$nodewar help** - Check that one out to learn how to use the nodewar feature.\n- **$fs** *tet ogre* Tells you an appropriate failstack number to slam your gear on.\n- Mention me and I'll talk to you! (Not working currently)"
      },
      {
        name: "__Admin Commands__",
        value:
          "- **$listEmojis** - List the emojis I can use.\n- **$listRoles** - List the server roles.\n- **$listChannels** - List the channels.\n"
      },
      {
        name: "__ServerAdmin Commands__",
        value:
          "- **$getConfiguration** - Dump the configuration related to the current server."
      }
    ]
    sendEmbedHelpAsDM(message, client, fields)
  }
}
