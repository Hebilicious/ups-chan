const Discord = require("discord.js");
const auth = require('../auth.json');
const client = new Discord.Client();

import { secretAlzy, pedoAge } from "./commands/secret-command.js"
import { handleNodeWar } from "./nodewar/index.js"
/**
 * Here we have to call this to initiate the bot.
 */
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

/**
 * The ping pong example.
 */
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

/**
 * Call a custom command on each message.
 */
client.on('message', msg => {
    // console.log(`New message : ${msg}`);
    secretAlzy(msg);
    pedoAge(msg, client);
    handleNodeWar(msg, client)
});
// channel.send(msg.guild.roles.map(r => `Name:${r.name}, Position:${r.position}, ID: ${r.id}`));

/**
 * This logs the bot in with the token from auth.json
 */
client.login(auth.token);
