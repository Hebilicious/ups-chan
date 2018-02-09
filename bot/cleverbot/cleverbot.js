import { Cleverbot } from "./api"
const auth = require("../../auth.json")

/**
 * Answer a message in a text channel using cleverbot.io.
 * @param {Message} message
 * @param {Client} client
 */
export function cleverAnswer(message, client) {
  //exit if we have no mention
  if (!message.mentions.members || !checkForApiKeys()) return
  //If we're mentionned in a text channel ...
  let first = message.mentions.members.first()
  if (first && first.id == client.user.id) {
    console.log("Replying in a text channel ...")
    const bot = createBot(message.author.id)
    bot
      .create()
      .then(() => {
        bot
          .ask(message.content)
          .then(response => message.reply(response))
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error))
  }
}

/**
 * Answer a DM using cleverbot.io
 * @param {Message} message
 */
export function cleverDM(message) {
  if (!message.channel.type === "dm" || !checkForApiKeys()) return
  const bot = createBot(message.author.id)
  bot
    .create()
    .then(() => {
      message.channel.startTyping()
      message.channel.stopTyping()
      bot
        .ask(message.content)
        .then(response => {
          let res = response
          message.channel.send(res)
          // setTimeout(() => {
          // }, Math.random() * (1 - 3) + 1 * 1000)
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}

//Create an api client.
function createBot(session) {
  return new Cleverbot({
    user: auth.cleverBotUser,
    key: auth.cleverBotKey,
    nick: session
  })
}

//Check that the config file has api logs.
function checkForApiKeys() {
  return auth.cleverBotUser && auth.cleverBotKey ? true : false
}
