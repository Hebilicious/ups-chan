const Discord = require("discord.js")
const auth = require("../auth.json")
const client = new Discord.Client()

import * as DB from "./database/database.js"

import * as Boss from "./boss/boss.js"

import * as rCommands from "./commands/regular-commands.js"
import * as aCommands from "./commands/admin-commands.js"

import * as events from "./events/events.js"
import * as cleverBot from "./cleverbot/cleverbot.js"
import { handleNodeWar } from "./nodewars/nodewar.js"
import { spoilThisContent } from "./spoiler/spoiler.js"
import { handleEnhance } from "./enhancing/enhancing.js"
import { Imperial } from "./imperial/imperial.js"

/**
 * Here we have to call this to initiate the bot.
 * This will setup the DB and load what need to
 * be autoloaded.
 */
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  //Sync the DB with every server.
  DB.syncConnectedServers(client).then(Boss.handleBoss(client))
  client.user.setPresence({
    game: {
      name: "Waiting for Lahn",
      url: "http://twitch.tv/fix8radio",
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
    if (message.guild == null) {
      // console.log("No guild...")
      cleverBot.cleverDM(message, client)
    }
    //Pass the message to all the commands ES2016+ PogChamp.
    const commands = { ...rCommands, ...aCommands }
    Object.entries(commands).forEach(([command, call]) => call(message, client))
    //List of feature.
    spoilThisContent(message, client)
    handleNodeWar(message, client)
    handleEnhance(message, client)
    cleverBot.cleverAnswer(message, client)
    // Imperial.handleMessage(message, client)
  } else {
    // console.log("Don't talk with yourself!")
  }
})

/**
 * This logs the bot in with the token from auth.json
 */
client.login(auth.token)
