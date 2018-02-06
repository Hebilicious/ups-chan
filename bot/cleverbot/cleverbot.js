import { Cleverbot } from "./api"
const auth = require("../../auth.json")

function createBot(session) {
  return new Cleverbot({
    user: auth.cleverBotUser,
    key: auth.cleverBotKey,
    nick: session
  })
}
function checkForApiKeys() {
  return auth.cleverBotUser && auth.cleverBotKey ? true : false
}
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

export function cleverDM(message) {
  console.log(checkForApiKeys())
  if (!message.channel.type === "dm" || !checkForApiKeys()) return
  const bot = createBot(message.author.id)
  bot
    .create()
    .then(() => {
      bot
        .ask(message.content)
        .then(response => {
          let res = response
          message.channel.startTyping()
          message.channel.stopTyping()
          message.channel.send(res)
          // setTimeout(() => {
          // }, Math.random() * (1 - 3) + 1 * 1000)
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}
