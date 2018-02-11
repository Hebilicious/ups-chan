import cheerio from "cheerio"
import axios from "axios"

import * as DB from "../database/database.js"

import { RichEmbed } from "discord.js"
import { EventEmitter } from "events"
import { bossData } from "./boss-data.js"
import { getRandomBossTopic } from "../verbose/messages"

// Inspired by https://github.com/Hermitter/BDO-Boss-Alerts/

/**
 * A Boss Event emitter.
 */
class BossEvent extends EventEmitter {
  constructor() {
    super()
  }
  /**
   *
   * @param {String} type Type of the event.
   * @param {Object} data The boss from boss-data.
   * @param {String} region Eu or Na
   */
  sendEvent(type, data, region = "eu") {
    this.emit(type, data, region)
    console.log(
      "BossEvent: " + new Date().toTimeString() + type + JSON.stringify(data)
    )
  }
}

/**
 * Handle the boss spawn logic.
 * @param {Client} client
 */
export function handleBoss(client) {
  //Should be called once to init the boss feature
  console.log("Initializing Boss Spawns...")
  const Emitter = new BossEvent()
  retrieveBossData(Emitter)

  //On new data, fetch again 10s later.
  Emitter.on("fetchingBossData", data => {
    retrieveBossData(Emitter)
    // setTimeout(() => retrieveBossData(Emitter), 10000)
    //TEST
    client.guilds.forEach(async guild => {
      let conf = await DB.Connect(guild)
        .table("configuration")
        .get(0)
      if (!conf.bossMod) return
      if (conf.bossChannel && conf.bossChannel.length > 0) {
        let cName = conf.bossChannel
        let channel = guild.channels.find("name", cName)
        if (channel) {
          channel.setTopic(getRandomBossTopic())
        }
      }
    })
  })

  //Should run on everyboss spawn.
  Emitter.on("bossSpawn", (boss, region) => {
    console.log("Handling boss spwawn")
    let embed = new RichEmbed()
      .setAuthor("UPS Boss Alert", boss.img)
      .setColor(0x00ae86)
      .setTimestamp()
      .setThumbnail(boss.img)
    client.guilds.forEach(async guild => {
      let conf = await DB.Connect(guild)
        .table("configuration")
        .get(0)
      if (!conf.bossMod) return
      if (conf.bossChannel && conf.region && conf.bossChannel.length > 0) {
        let cName = conf.bossChannel
        let channel = guild.channels.find("name", cName)
        if (channel && conf.region == region) {
          console.log(region + " " + boss.alert)
          if (!role) {
            embed.setTitle(boss.name)
          } 
          if (role) {
            embed.setTitle(guild.roles.find('name', boss.name))
          }
          embed.setDescription(boss.alert)
          embed.setFooter(conf.region.toUpperCase())
          channel.send({ embed })
        }
      }
    })
  })
}

///////////////////////////////////////
//Obtaining Boss Spawning Data (Loop)
//////////////////////////////////////
//Boss Data Holders: Ordered by how they appear on http://urzasarchives.com/bdo/wbtbdo/wbtna/ is mandatory

/**
 * Scrape the website for data.
 * @param {BossEvent} Emitter BossEvent Emitter
 */
function retrieveBossData(Emitter) {
  //Url for boss spawn data
  const url = {
    eu: "http://urzasarchives.com/bdo/wbtbdo/wbteu/",
    na: "http://urzasarchives.com/bdo/wbtbdo/wbtna/"
  }
  //Obtain Boss Spawn Data
  setTimeout(() => Emitter.sendEvent("fetchingBossData", {}), 10000)

  Promise.all([axios(url.eu), axios(url.na)])
    .then(responses => {
      //Iterating...
      for (let i = 0; i < responses.length; i++) {
        let $ = cheerio.load(responses[i].data) //html body
        //   console.log("Status: " + responses[i].status)
        //Attempt Obtain And Assign Boss Spawn Data
        try {
          //find each boss spawn
          let counter = 0
          //   console.log(bossData)
          for (let boss in bossData) {
            readBossData(bossData[boss], counter, $("table"), Emitter, i)
            counter++
          }
        } catch (e) {
          console.log(e)
        }
      }
    })
    .catch(error => console.error(error))
}

/**
 * Read the boss data and send an event if it did spawn.
 * @param {Object} boss Boss from boss data.
 * @param {Number} tableNumber Where the boss is on the table.
 * @param {Object} table Cheerio table.
 * @param {BossEvent} Emitter Boss Event Emitter
 * @param {Number} itr Represents wether it's eu or na.
 */
function readBossData(boss, tableNumber, table, Emitter, itr) {
  let region = itr == 0 ? "eu" : itr == 1 ? "na" : ""
  let selector = table //initial html table element
  let lastSpawn
  //find desired boss table
  for (let i = 0; i < tableNumber; i++) {
    selector = selector.next()
  }
  //record last boss spawn
  lastSpawn = selector
    .find("tbody > tr")
    .next()
    .find("td")
    .next()
    .next()
    .html()
  //ensure spawn time has numbers
  if (!/\d/.test(lastSpawn)) return //exit
  //check if boss spawned
  if (
    lastSpawn != null &&
    boss.lastSpawn[region] &&
    boss.lastSpawn[region] !== lastSpawn
  ) {
    console.log("BOSS SPAWNED")
    Emitter.sendEvent("bossSpawn", boss, region) //alert if spawned
  }
  boss.lastSpawn[region] = lastSpawn //update last boss spawn in the bossData object
}