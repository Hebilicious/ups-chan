import yaml from "js-yaml"
import _ from "lodash"

const fs = require("fs")
const path = require("path")

import {getRandomGoodLuckMessage} from "../verbose/messages.js"
export function handleEnhance(message, client) {
  const keyFs = "$fs"
  if (message.content.startsWith(keyFs)) {
    failstackManager(message, client)
  }
}

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
  const grade = Object.keys(target)
  //Get all the object names
  Object.entries(failstacks).forEach(([key, ...type]) => {
    _.flattenDeep(type).forEach(o => names.push(o.name))
  })
  names = _.flattenDeep(names)

  if (!firstArg || !secondArg) {
    return message.reply(`Please use the command correctly. Refer to **$help**.`)
  }
  let notHelping = true
  if (isWordInList(firstArg, grade) && isWordInList(secondArg, names)) {
    //Iterate over failstacks file.
    Object.entries(failstacks).forEach(([key, ...obj]) => {
      //Iterate over each flatten subdivision
      _.flattenDeep(obj).forEach(iType => {
        if (isWordInList(secondArg, iType.name)) {
          //Iterate over itemtypes properties.
          Object.entries(iType).forEach(([k, v]) => {
            if (v.current == target[firstArg]) {
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
    message.reply(`I don't know what a ${firstArg} ${secondArg} is, I'm sorry :'(`)
  }
}

function isWordInList(word, list) {
  if (list.length > 0) {
    return list.some(w => w.toLowerCase() == word.toLowerCase())
  }
}
