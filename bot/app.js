const Discord = require("discord.js")
const auth = require("../auth.json")
const client = new Discord.Client()

import * as DB from "./database/database.js"

import * as rCommands from "./commands/regular-commands.js"
import * as aCommands from "./commands/admin-commands.js"

import * as events from "./events/events.js"
import { handleEnhance } from "./enhancing/enhancing.js"
import { handleNodeWar } from "./nodewars/nodewar.js"
/**
 * Neither the cleverbot nor spoiler protection features are working currently 
 * and I'm not willing to fix that just now. You can live without them.
 */
// import * as cleverBot from "./cleverbot/cleverbot.js"
// import { spoilThisContent } from "./spoiler/spoiler.js"


/**
 * Here we have to call this to initiate the bot.
 * This will setup the DB and load what need to
 * be autoloaded.
 */
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  //Sync the DB with every server.
  DB.syncConnectedServers(client)
  client.user.setPresence({
    game: {
      name: "Waiting for Drieghan",
      url: "http://twitch.tv/alzyx",
      type: "STREAMING"
    }
  })
})

/**
 * Sync the DB when we join a new server.
 */
client.on("guildCreate", () => DB.syncConnectedServers(client))

/**
 * To our very special princess...
 */
client.on("message", message => {
  if (message.content === "I love you.") {
    message.reply("I know.")
  }
})

/**
 * Fancy event handler!
 * @type {[type]}
 */
Object.entries(events).forEach(([key, event]) => {
  let e = new event()
  client.on(e.eventName, (...args) => {
    e.handleEvent(client, ...args)
  })
})

/**
 * Call a custom command on each message.
 */
client.on("message", message => {
  // console.log(`New message : ${message.author.id}`)
  // console.log(`User:${message.author.username}, ID: ${message.author.id}`)
  if (message.author.id != client.user.id) {
    //DM only
    // if (message.guild == null) {
    //   cleverBot.cleverDM(message, client)
    // }
    //Pass the message to all the commands ES2016+ PogChamp.
    const commands = { ...rCommands, ...aCommands }
    Object.entries(commands).forEach(([command, call]) => call(message, client))
    //List of feature.
    handleNodeWar(message, client)
    handleEnhance(message, client)
    // cleverBot.cleverAnswer(message, client)
  } else {
    // console.log("Don't talk with yourself!")
  }
})

/**
 * This logs the bot in with the token from auth.json
 */
client.login(auth.token)
