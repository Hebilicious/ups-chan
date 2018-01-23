const Discord = require("discord.js")
const auth = require("../auth.json")
const client = new Discord.Client()

import * as rCommands from "./commands/regular-commands.js"
import * as aCommands from "./commands/admin-commands.js"
import * as events from "./events/events.js"
import {handleNodeWar} from "./nodewars/nodewar.js"
import {spoilThisContent} from "./spoiler/spoiler.js"
import {handleEnhance} from "./enhancing/enhancing.js"
/**
 * Here we have to call this to initiate the bot.
 */
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)

  client.user.setPresence({
    game: {
      name: "Waiting for Lahn",
      url: "http://twitch.tv/fix8radio",
      type: "STREAMING"
    }
  })
})

/**
 * To our very special princess...
 */
client.on("message", message => {
  if (message.content === "I love you.") {
    // console.log(message.member.roles)
    message.reply("I know.")
  }
})

/**
 * Fancy event handler!
 * @type {[type]}
 */
Object.entries(events).forEach(([key, imported]) => {
  console.log(imported.name)
  client.on(imported.name, (...args) => {
    imported(client, ...args)
  })
})

/**
 * Call a custom command on each message.
 */
client.on("message", message => {
  // console.log(`New message : ${message}`);
  // Check for dms
  if (message.member != null) {
    //Pass the message to all the commands ES2016+ PogChamp.
    const commands = {...rCommands, ...aCommands}
    Object.entries(commands).forEach(([command, call]) => call(message, client))
    spoilThisContent(message, client)
    handleNodeWar(message, client)
    handleEnhance(message, client)
  }
})
// channel.send(message.guild.roles.map(r => `Name:${r.name}, Position:${r.position}, ID: ${r.id}`));

/**
 * This logs the bot in with the token from auth.json
 */
client.login(auth.token)
