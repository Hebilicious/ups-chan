import yaml from "js-yaml"
import _ from "lodash"

const fs = require("fs")
const path = require("path")

import { getRandomGoodLuckMessage } from "../verbose/messages.js"
import { isWordInList } from "../helpers.js"

/**
 * Handle what we do when we get the keyword related to ehnancing.
 * @param {Message} message Message Object from DiscordJS
 * @param {Client} client DiscordJS client.
 */
export function handleEnhance(message, client) {
  const keyFs = "$fs"
  if (message.content.startsWith(keyFs)) {
    failstackManager(message, client)
  }
}

/**
 * Failstack logic.
 * @param {Message} message Message Object from DiscordJS
 * @param {Client} client DiscordJS client.
 */
function failstackManager(message, client) {
  let args = message.content
    .slice(1)
    .trim()
    .split(/ +/g)
  let command = args.shift().toLowerCase()
  let firstArg = args[0]
  let secondArg = args[1]
  let failstacks
  let target
  let names = []
  let notHelping = true

  //Parse the failstacks.yaml
  try {
    failstacks = yaml.safeLoad(
      fs.readFileSync(path.join("bot/enhancing", "failstacks.yaml"), "utf8")
    )
    target = yaml.safeLoad(
      fs.readFileSync(path.join("bot/enhancing", "target.yaml"), "utf8")
    )
    // console.log(data)
  } catch (e) {
    console.log(e)
  }
  target = target.target
  const grades = Object.keys(target)
  //Get all the object names
  Object.entries(failstacks).forEach(([key, ...type]) => {
    _.flattenDeep(type).forEach(o => names.push(o.name))
  })
  names = _.flattenDeep(names)

  if (!firstArg || !secondArg) {
    return message.reply(
      `Please use the command correctly. Refer to **$help**.`
    )
  }
  if (isWordInList(firstArg, grades) && isWordInList(secondArg, names)) {
    //Iterate over failstacks file.
    Object.entries(failstacks).forEach(([key, ...obj]) => {
      //Iterate over each flatten subdivision
      _.flattenDeep(obj).forEach(iType => {
        if (isWordInList(secondArg, iType.name)) {
          //Iterate over itemtypes properties.
          Object.entries(iType).forEach(([k, v]) => {
            if (v.current == target[firstArg.toLowerCase()]) {
              notHelping = false
              message.reply(
                `Use stacks ranging from ${v.minStack} to ${
                  v.maxStack
                }. ${getRandomGoodLuckMessage()}`
              )
            }
          })
        }
      })
    })
    console.log("nothelping?")
    notHelping
      ? message.reply(
          `You should definitely know how to make that ${firstArg} ${secondArg} yourself. I'm not helping you.`
        )
      : null
  } else {
    message.reply(
      `Nobody told me what a ${firstArg} ${secondArg} was, so feel free to YOLO it (:`
    )
  }
}
