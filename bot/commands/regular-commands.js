import moment from "moment-timezone"

export function secretAlzy(msg) {
  if (msg.content === "alzy") {
    console.log("Alzy !!")
    // Send the message to a designated channel on a server:
    const channel = msg.member.guild.channels.find(
      "name",
      "drama-super-important-and-private-stuff"
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
    msg.reply("Expect. Expecting. ")
  }
}

export function help(message, client) {
  message.member.user.createDM().then(function(DM) {
    DM.send({
      embed: {
        color: 16753920,
        title: `${message.member.displayName} customized UPS-Chan help <3`,
        url: "https://www.ups.com",
        description: "This is a list of some of the commands.",
        fields: [
          {
            name: "__Regular commands__",
            value:
              "**$nodewar help** - Gives you the nodewar help commands.\n*topic* **$spoiler** *content* - Creates a spoiler for your content.\n"
          },
          {
            name: "__Admin commands__",
            value:
              "**$listEmojis** - List all the Emojis.\n**listRoles** - List all the Roles.\n**$listChannels** - List all the Channels.\n"
          }
        ],
        timestamp: moment().tz(timezone),
        footer: {
          icon_url: client.user.avatarURL,
          text: client.user.username
        }
      }
    })
  })
}
