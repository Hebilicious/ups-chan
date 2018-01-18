export function secretAlzy(msg) {
  if (msg.content === "alzy") {
    console.log("Alzy !!")
    // Send the message to a designated channel on a server:
    const channel = msg.member.guild.channels.find(
      "name",
      "super-important-and-private-stuff"
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

export function pedoAge(msg, client) {
  const regex = /(\bunderage\b|\bage\b)+/gim
  let m
  // console.log("I'm a bot ? " + msg.author.bot);
  if (msg.author.bot == false && (m = regex.exec(msg)) !== null) {
    console.log("Matched age somewhere...")
    const ePedoBear = client.emojis.find("name", "PedoBear")
    const eKappa = client.emojis.find("name", "Kappa")
    const reply = `${ePedoBear} Age is nothing but a number ... ${eKappa}`
    // console.log(reply);
    msg.reply(reply)
  }
}

export function grammar(msg) {
  const ex = ["execpt", "excpet", "excetp", "except"]
  if (ex.some(w => msg.content.includes(w))) {
    msg.reply("Expect. Expecting.")
  }
}
