import r from "rethinkdbdash"
export r from "rethinkdbdash"

export async function Connect(guild) {
  return r.db(guild.id)
}

export function syncConnectedServers(client) {
  client.guilds.forEach(guild => {
    // console.log(guild.id)
    if (!r.dbList().includes(guild.id)) {
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
                  nodeWarChannel: "",
                  attendingRole: "",
                  adminRoleIds: []
                })
            })
        })
    } else {
      console.log(`DB ${guild.id} (${guild.name}) is ready.`)
    }
  })
}
