import moment from "moment-timezone"
const timezone = "Europe/Paris"

/**
 * Send an embed as a DM
 * @param {Message} message
 * @param {Client} client
 * @param {Object} fields The content of the message.
 */
export function sendEmbedHelpAsDM(message, client, fields) {
  sendDM(message, client, {
    embed: {
      color: 16753920,
      title: `${message.member.displayName} customized UPS-Chan help 💗`,
      url: "https://www.ups.com",
      description: "This is a list of all the commands.",
      fields: fields,
      timestamp: moment().tz(timezone),
      footer: {
        icon_url: client.user.avatarURL,
        text:
          client.user.username + " - Contact ➡ Hebilicious#3910 on Discord 🎯."
      }
    }
  })
}

function sendDM(message, client, content) {
  message.member.user.createDM().then(DM => DM.send(content))
}
