const Discord = require("discord.js");
const auth = require('./auth.json');
const client = new Discord.Client();

import secretAlzy from "commands/secret-command"


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.on('message', msg => {
    secretAlzy
});

client.login(auth.token);
