import leven from "leven"
import Ntw from "number-to-words"
import Wtn from "words-to-num"

import * as DB from "../database/database.js"

import { RichEmbed } from "discord.js"

import {
  Velia,
  Balenos,
  Serendia,
  Calpheon,
  Valencia,
  Kamasylvia
} from "./imperial-channels.js"

import * as Channels from "./imperial-channels"

const Keys = { imperial: "$trade" }

const Items = {
  Velia: ["Censor", "Lacquer"],
  Calpheon: ["Ginseng", "Slab"],
  Heidel: ["Ginseng", "Lamp"],
  Altinova: ["Porcelain", "Saber"],
  Valencia: ["Silk", "Kite"]
}

export class Imperial {
  constructor() {
    throw "This class mustn't be instanciated."
  }
  static handleMessage(message, client) {
    this.message = message
    this.client = client
    //Check channel
    let args = this.message.content
      .slice(1)
      .trim()
      .split(/ +/g)
    let command = args.shift().toLowerCase()
    console.log(command)
    if ("$" + command === Keys.imperial) this.checkConfiguration(args)
  }

  static checkConfiguration(imperialReport) {
    //Check the guild conf.
    this.parseArguments(imperialReport)
  }

  static findItem(item) {
    return Object.entries(Items)
      .map(([city, items]) => {
        let tmp = closestElement(item, items)
        console.log(tmp)
        return [city, ...tmp]
      })
      .reduce((prev, curr) => (prev[2] < curr[2] ? prev : curr))
  }

  static parseArguments(imperialReport) {
    //Ve1 censor 0 porcelain 20
    //0    1     2   3        4
    //Ve2 censor 0
    // 0   1     2
    //Ve2 censor
    // 0   1
    //Check if
    if (!/\d/.test(imperialReport[0])) return
    //Get channel name and number
    let channelName = imperialReport[0].replace(/[0-9]/g, "")
    let channelNumber = /[0-9]/g.exec(imperialReport[0], "")[0]
    //Check we have a valid number
    if (channelNumber > 6 || channelNumber < 1) return
    //["Velia", 2] 2 is the leven number
    //Find the correct channel
    let foundChannel = closestElementFL(channelName, Object.keys(Channels))
    //Find the correct item
    console.log(foundChannel)
    //["Velia", "Censor", 2] 2 is the leven number
    let foundItem = this.findItem(imperialReport[1])
    console.log(foundItem)
    // return
    switch (imperialReport.length) {
      case 2:
        //Ve2 censor
        console.log("case 2")
        this.updateTable(foundChannel, channelNumber, [foundItem, "?"])
        break
      case 3:
        //Ve2 censor 0
        console.log("case 3")
        console.log(imperialReport[2])
        if (Number.isInteger(Number.parseInt(imperialReport[2]))) {
          console.log(imperialReport[2])
          this.updateTable(foundChannel, channelNumber, [
            foundItem,
            imperialReport[2]
          ])
        } else {
          //Ve1 censor porcelain
          this.updateTable(foundChannel, channelNumber, [foundItem, "?"])
        }
        break
      case 4:
        console.log("case 4")

        //Ve1 censor 0 porcelain
        if (Number.isInteger(imperialReport[2])) {
          let secondItem = this.findItem(imperialReport[2])
          this.updateTable(
            foundChannel,
            channelNumber,
            [foundItem, imperialReport[2]],
            [secondItem, "?"]
          )
        } else {
          //Ve1 censor porcelain 1
          let secondItem = this.findItem(imperialReport[3])
          this.updateTable(
            foundChannel,
            channelNumber,
            [foundItem, "?"],
            [secondItem, imperialReport[3]]
          )
        }
        break
      case 5:
        console.log("case 5")

        //Ve1 censor 0 porcelain 1
        let secondItem = this.findItem(imperialReport[4])
        this.updateTable(
          foundChannel,
          channelNumber,
          [foundItem, imperialReport[2]],
          [secondItem, imperialReport[4]]
        )
        break
      default:
        this.sendError(`The input ${imperialReport.join(" ")}is invalid.`)
    }
  }

  static updateTable(...args) {
    console.log("Updating table")
    console.log(args)
    let channel = args[0]
    let cNumber = args[1]
    let firstItem = {
      city: args[2][0][0],
      name: args[2][0][1],
      quantity: args[2][1]
    }
    let secondItem = args[3]
      ? { city: args[3][0][0], name: args[3][0][1], quantity: args[3][1] }
      : null

    if (secondItem && secondItem.city !== firstItem.city) return
    //delete last bot message
    this.setChannelItems(channel, cNumber, firstItem, secondItem).then(() => {
      this.buildTable()
    })
    //this.buildTable()
  }

  static setChannelItems(channel, cNumber, firstItem, secondItem) {
    console.log("Set channel Items")
    return new Promise(resolve => {
      let number = Ntw.toWords(cNumber)
      // console.log(number)
      let c = channel[0]
      // console.log(c)
      let quantity = firstItem.quantity
      // console.log(quantity)
      // console.log(Channels[c])
      let entry = { [firstItem.name]: quantity }
      // console.log(entry)
      if (!secondItem) {
        if (Channels[c][number] instanceof Object) {
          Channels[c][number] = Object.assign({}, Channels[c][number], entry)
        } else {
          Channels[c][number] = entry
        }
        resolve()
      } else {
        let entry2 = { [secondItem.name]: secondItem.quantity }
        // console.log(entry2)
        if (Channels[c][number] instanceof Object) {
          Channels[c][number] = Object.assign(
            {},
            Channels[c][number],
            entry,
            entry2
          )
        } else {
          Channels[c][number] = Object.assign({}, entry, entry2)
        }
        resolve()
      }
    })
  }

  // prettier-ignore
  static buildTable() {
    let embed = new RichEmbed()
    let image = ""
    embed
      .setAuthor("UPS Imperial Trading", image)
      .setColor(0x00ae86)
      .setFooter("Last updated at")
      .setTimestamp()
      .setThumbnail(image)
      console.log(Channels)
      Object.entries(Channels).forEach(([name, numbers]) =>{
          embed.addField(`
          ${name}:`, `${mapChannelNumbers(numbers)}`)
      })
    this.message.channel.send({embed})
    }
}

function closestElementFL(needle, haystack) {
  return haystack
    .filter(
      straw =>
        straw[0].toLowerCase() == needle[0].toLowerCase() &&
        straw[1].toLowerCase() == needle[1].toLowerCase()
    )
    .map(straw => [straw, leven(needle, straw)])
    .reduce((p, c) => (p[1] < c[1] ? p : c))
}
function closestElement(needle, haystack) {
  return haystack
    .map(straw => [straw, leven(needle, straw)])
    .reduce((p, c) => (p[1] < c[1] ? p : c))
}

function mapChannelNumbers(numbers) {
  return Object.entries(numbers)
    .map(([number, items]) => `${Wtn.convert(number)} : ${mapItems(items)}`)
    .join("\n")
}
// {Censor: "?", Porcelain: 5},
function mapItems(items) {
  return Object.entries(items).map(
    ([name, quantity]) => ` ${getEmoji(name)} | ${quantity}`
  )
}

function getEmoji(name) {
  //Return the correct emoji
  return name
}
