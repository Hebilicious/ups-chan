import * as Meeseeks from "../helpers.js";

/**
 * List Emojis the bot has access to.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */
export function listEmojis(message, client) {
  if (message.content === "$listEmojis") {
    console.log("listing emojis");
    const emojiList = client.emojis.map(
      e =>
        `**${client.emojis.get(e.id)} Name**: ${e.name}, **Identifier**: ${
          e.identifier
        }, **ID:** ${e.id}`
    );

    let toSend = Meeseeks.superSplit(emojiList.join("\n"), 2000);
    // console.log(toSend);
    emojiList.join("\n").forEach(el => message.channel.send(el.toString()));
    // Meeseeks.superArraySplit(Array(50).fill(mock), 500).forEach(el => console.log(el))
  }
}

let mock =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus sapien augue, eget malesuada elit pretium rutrum. Nunc commodo enim non vestibulum aliquet.";
