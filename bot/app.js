const Discord = require("discord.js")
const auth = require("../auth.json")
const client = new Discord.Client()

import * as commands from "./commands/secret-command.js"
import {handleNodeWar} from "./nodewars/nodewar.js"
import * as events from "./events/event.js"

// import rethink from "rethinkdb"

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
 * The ping pong example.
 */
client.on("message", msg => {
  if (msg.content === "I love you.") {
    console.log(msg.member.roles)
    msg.reply("I know.")
  }
})

client.on("guildMemberUpdate", (oldM, newM) => {
  events.memberUpdate(oldM, newM)
})
/**
 * Call a custom command on each message.
 */
client.on("message", msg => {
  // console.log(`New message : ${msg}`);
  // Check for dms
  if (msg.member != null) {
    commands.secretAlzy(msg)
    commands.pedoAge(msg, client)
    commands.grammar(msg)
    handleNodeWar(msg, client)
  }
})
// channel.send(msg.guild.roles.map(r => `Name:${r.name}, Position:${r.position}, ID: ${r.id}`));

/**
 * This logs the bot in with the token from auth.json
 */
client.login(auth.token)
