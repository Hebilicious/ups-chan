// channel.send(msg.guild.roles.map(r => `Name:${r.name}, Position:${r.position}, ID: ${r.id}`));

export function listEmojis(message, client) {
  if (message.content === "$listEmojis") {
    console.log("listing emojis")
    const emojiList = client.emojis.map(e => e.toString()).join(" ")
    message.reply(emojiList)
  }
}
