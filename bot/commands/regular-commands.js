import moment from "moment-timezone"
import {sendEmbedHelpAsDM} from "../verbose/functions.js"
const timezone = "Europe/Paris"

export function ups(message, client) {
  if (message.content.includes("ups")) {
    message
      .react("🇺")
      .then(() => message.react("🇵"))
      .then(() => message.react("🇸"))
      .then(() => {
        const emoji = message.guild.emojis.find("name", "PagChomp")
        message.react(emoji)
      })
      .catch(() => console.error("One of the emojis failed to react.")) // message.react("316287767648927744")
  }
}
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
  if (msg.author.bot == false && (m = regex.exec(msg.content)) !== null) {
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
  if (message.content === "$help") {
    const fields = [
      {
        name: "__Commands__",
        value:
          "- **$nodewar help** - Gives you the nodewar help commands.\n- *topic* **$spoiler** *content* - Creates a spoiler for your content.\n- **$fs *tet ogre* Tells you an appropriate failstack number to slam your gear on."
      },
      {
        name: "__Nodewar commands__",
        value:
          "- **$attend** - set your role to *Attending*.\n- **$cancel** - remove yourself from the *Attending* list.\n- **$nodewar** - tells you the date for the the upcoming nodewar."
      },
      {
        name: "__Admin commands__",
        value:
          "- **$listEmojis** - List all the Emojis.\n- **$listRoles** - List all the Roles.\n- **$listChannels** - List all the Channels.\n"
      },
      {
        name: "__Admin Nodewar commands__",
        value:
          "- **$nwlist** - list all the participants for the upcoming nodewar.\n- **$nodewar *date*** - creates a nodewar event at the specified date.\n- **$nodewar cancel** - cancel the current nodewar\n- **$nodewar win** - end the current nodewar with a win.\n- **$nodewar loss** - end the current nodewar with a loss."
      }
    ]
    sendEmbedHelpAsDM(message, client, fields)
  }
}
