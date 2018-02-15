import moment from "moment-timezone"
import { sendEmbedHelpAsDM } from "../verbose/functions.js"
import { getRandomMeeseeksInteraction } from "../verbose/messages.js"
const timezone = "Europe/Paris"

/**
 * Talks to Mr meeseeks.
 * @param {Message} message
 * @param {Client} client
 */
export function meeseeksAnswer(message, client) {
  //MeeseeksBOT ID
  if (message.author.id == "159985870458322944") {
    message.channel.send(getRandomMeeseeksInteraction()).then(m => {
      setTimeout(() => {
        m.delete()
      }, 2500)
    })
  }
}

/**
 * Toggle a specific role.
 * @param {Message} message
 */
export function toggleRole(message) {
  // Roles which can be toggled by regular members
  const roleObj = {
    summon: "Summon",
    kzarka: "Kzarka",
    kutum: "Kutum",
    karanda: "Karanda",
    nouver: "Nouver",
    bheg: "Bheg",
    mud: "Mudster",
    red: "Red Nose",
    dim: "Dim Tree",
    ogre: "Ogre Muraka",
    troll: "Troll Quint",
    rareitem: "rareitem"
  }
  let roleFound = false
  //Starts with ., has alphabetic char after the dot, one word.
  if (/[.][a-zA-Z]+/.test(message.content)) {
    Object.entries(roleObj).forEach(([command, roleName]) => {
      if (message.content.toLowerCase() === `.${command}`) {
        roleFound = true
        const role = message.guild.roles.find("name", roleName)
        if (!role) {
          message.guild
            .createRole({ name: roleName, mentionable: true, color: "PURPLE" })
            .then(role => {
              message.channel.send(`Created role ${roleName}.`)
              handleRole(role)
            })
            .catch(console.error)
        } else {
          handleRole(role)
        }
      }
    })

    if (!roleFound)
      message.reply("This role is either non-existent or not assignable.")

    function handleRole(role) {
      if (!message.member.roles.some(r => r.id == role.id)) {
        message.member.addRole(role)
      } else if (message.member.roles.some(r => r.id == role.id)) {
        message.member.removeRole(role)
      }
    }
  }
}
/**
 * Be proud of yourself.
 * @param {Message} message
 * @param {Client} client
 */
export function ups(message, client) {
  const regex = /(\bups\b)+/gim
  let randomly = Math.floor(Math.random() * 4)
  if (regex.test(message.content) && randomly == 1) {
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

/**
 * Alzy easter egg.
 * @param {Message} message
 */
export function secretAlzy(message) {
  if (message.content === "alzy") {
    console.log("Alzy !!")
    // Send the message to a designated channel on a server:
    const channel = message.member.guild.channels.find(
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

/**
 * Age easter egg.
 * @param {Message} message
 * @param {Client} client
 */
export function pedoAge(message, client) {
  const regex = /(\bunderage\b|\bage\b)+/gim
  let m
  // console.log("I'm a bot ? " + message.author.bot);
  let randomly = Math.floor(Math.random() * 2)
  if (
    randomly == 1 &&
    message.author.bot == false &&
    (m = regex.exec(message.content)) !== null
  ) {
    console.log("Matched age somewhere...")
    const ePedoBear = client.emojis.find("name", "PedoBear") || ":)"
    const eKappa = client.emojis.find("name", "Kappa") || ":3"
    const reply = `${ePedoBear} Age is nothing but a number ... ${eKappa}`
    // console.log(reply);
    message.reply(reply)
  }
}

/**
 * Expect grammar.
 * @param {Message} message
 */
export function grammar(message) {
  const ex = ["execpt", "exectp", "excpet", "excetp", "except", "excpect"]
  if (ex.some(w => message.content.includes(w))) {
    message.reply("Expect. Expecting. ")
  }
}

/**
 * Send the help.
 * @param {Message} message
 * @param {Client} client
 */
export function help(message, client) {
  if (message.content === "$help") {
    const fields = [
      {
        name: "__Commands__",
        value:
          "- **$nodewar help** - Check that one out to learn how to use the nodewar feature.\n- *topic* **$spoiler** *content* - Creates a GIF that prevent spoiler for your content.\n- **$fs** *tet ogre* Tells you an appropriate failstack number to slam your gear on.\n- Mention me and I'll talk to you!"
      },
      {
        name: "__Admin commands__",
        value:
          "-**$setRegion *eu/na*** - Set the region to EU or NA.\n-**$bossMod on** - Enable the boss feature.\n-**$bossMod off** - Disable the boss feature.\n-**$bossMod on** - Enable the boss feature.\n-**$bossMod channel *boss*** - Set the boss chanel name to 'boss'.\n- **$listEmojis** - List the emojis I can use.\n- **$listRoles** - List the server roles.\n- **$listChannels** - List the channels.\n"
      },
      {
        name: "__ServerAdmin commands__",
        value:
          "- **$getConfiguration** - Dump the configuration related to the current server."
      }
    ]
    sendEmbedHelpAsDM(message, client, fields)
  }
}
