const r = require("rethinkdbdash")()

/**
 * Connect to a specified guild database.
 * @param {Guild} guild
 */
export function Connect(guild) {
  console.log(`Connecting to the DB of ${guild.name}`)
  return r.db(guild.id)
}

/**
 * Update/Add a configuration property.
 * @param {Guild} guild
 * @param {Object} updates Contains key:value to update/add.
 */
export function UpdateConfiguration(guild, updates) {
  console.log(`Updating ${guild.name} configuration...`)
  return Connect(guild)
    .table("configuration")
    .get(0)
    .update(updates)
    .run()
}

/**
 * Update a configuration property array.
 * @param {Guild} guild
 * @param {String} key Key of the configuration to update.
 * @param {String | Array} updates Value to add/update.
 * @param {Boolean} remove Wether we diff or append.
 */
export function UpdateConfigurationArray(guild, key, updates, remove = false) {
  console.log(`Updating ${guild.name} configuration array...`)
  return remove
    ? Connect(guild)
        .table("configuration")
        .get(0)
        .update({ [key]: r.row(key).difference(updates) })
        .run()
    : Connect(guild)
        .table("configuration")
        .get(0)
        .update({ [key]: r.row(key).append(updates) })
        .run()
}

/**
 * Add serverName to the configuration.
 * @param {Client} client
 */
export async function addServerNametoDB(client) {
  let dbList = await r.dbList().run()
  client.guilds.forEach(guild => {
    if (dbList.includes(guild.id)) {
    }
    console.log("Fixing db for " + guild.name)
    r
      .db(guild.id)
      .table("configuration")
      .get(0)
      .update({ serverName: guild.name })
      .run()
      .then(async result =>
        console.log(
          await r
            .db(guild.id)
            .table("configuration")
            .get(0)
        )
      )
  })
}

/**
 * Sync the connected guilds (servers) with the db backend by creating
 * the tables if they don't exist.
 * @param {Client} client
 * @returns {Promise}
 */
export async function syncConnectedServers(client) {
  // console.log(r.dbList())
  let dbList = await r.dbList().run()
  console.log(dbList)
  return new Promise((resolve, reject) => {
    client.guilds.forEach(guild => {
      // console.log(guild.id)
      if (!dbList.includes(guild.id)) {
        console.log(`Creating DB ${guild.id} (${guild.name}).`)
        r
          .dbCreate(guild.id)
          .run()
          .then(result => {
            r
              .db(guild.id)
              .tableCreate("nodewar")
              .run()
            r
              .db(guild.id)
              .tableCreate("configuration")
              .run()
              .then(result => {
                r
                  .db(guild.id)
                  .table("configuration")
                  .insert({
                    id: 0,
                    serverName: guild.name,
                    nodeWarChannel: "",
                    bossMod: false,
                    bossChannel: "",
                    attendingRole: "Attending",
                    region: "eu",
                    adminRolesIds: []
                  })
                  .run()
                  .then(result => {
                    console.log(
                      `The fresh DB ${guild.id} (${guild.name}) is ready.`
                    )
                    resolve()
                  })
              })
          })
      } else {
        console.log(`Found DB ${guild.id} (${guild.name}), ready to use.`)
        resolve()
      }
    })
  })
}
