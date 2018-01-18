import rethink from "rethinkdb"
import moment from "moment-timezone"
import {clearAttendingMembers} from "./features.js"

const timezone = "Europe/Paris"

/**
 * End a nodewar
 * @param  {[Object]} message [The initial message]
 * @param  {[Object]} channel [The Nodewar channel]
 * @param  {[Object]} role    [The Attending Role]
 * @param  {[String]} result  [Win or Lose]
 * @return {[type]}         [description]
 */
export function endNodeWar(message, channel, role, result) {
  //1.Fetch the current nodewar.
  //2. Update it with the results
  //3. Clear the attendingmembers.
  let victory
  if (result == "win") {
    victory = true
  }
  if (result == "lose") {
    victory = false
  }
  let updatedNW = {
    isActive: false,
    victory: victory,
    attendingMembers: message.member.guild.roles
      .find("name", role.name)
      .members.map(m => m.user.id)
  }
  rethink.connect({host: "localhost", port: 28015}).then(function(conn) {
    rethink
      .db("test")
      .table("nodewar")
      .filter({isActive: true})
      .update(updatedNW)
      .run(conn, function(err, result) {
        if (err) throw err
        console.log(JSON.stringify(result, null, 2))
        if (victory) {
          message.channel.send(
            `Congratulations to @everyone for this insane win !!!`
          )
          setNodewarTopic(message, "EZ game EZ win EZ")
        } else {
          message.channel.send("NextTime 4sure.")
          setNodewarTopic(message, "We got unlucky.")
        }
        clearAttendingMembers(message, channel, role)
      })
  })
}

/**
 * Cancel a nodewar event
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
export function cancelNodeWar(message, channel, role) {
  rethink.connect({host: "localhost", port: 28015}).then(function(conn) {
    rethink
      .db("test")
      .table("nodewar")
      .filter({isActive: true})
      .delete()
      .run(conn, function(err, result) {
        if (err) throw err
        console.log(JSON.stringify(result, null, 2))
        message.reply(`NodeWar successfully canceled.`)
        setNodewarTopic(message, "UPS will prevail soon.")
        clearAttendingMembers(message, channel, role)
      })
  })
}

/**
 * Write a nodewar event to the filesystem.
 * @param  {[type]} message [description]
 * @param  {[type]} date    [description]
 * @return {[type]}         [description]
 */
export function createNodeWar(message, date) {
  console.log("Creating nodewar")
  let endDate = date.add({hours: 10, minutes: 30})
  let nwObject = {
    isActive: true,
    victory: false,
    date: date.format(),
    createdAt: moment.tz(moment(), timezone).format(),
    creatorId: message.member.id,
    attendingMembers: 0
  }
  // 1.Check that we have the table
  // 2.Check that currrent nodewar is over
  // 3. Create a nodewar Entry
  rethink.connect({host: "localhost", port: 28015}).then(function(conn) {
    rethink
      .db("test")
      .tableList()
      .run(conn)
      .then(function(result) {
        console.log(result)
        if (result.includes("nodewar")) {
          console.log("Letscheck")
          // console.log(nwObject)
          checkIfNodeWarIsActive(conn, nwObject, message)
        } else {
          //Refactor to remove that.
          console.log("Letscreate and check")
          rethink
            .db("test")
            .tableCreate("nodewar")
            .run(conn)
            .then(function(result) {
              console.log(result)
              checkIfNodeWarIsActive(conn, nwObject, message)
            })
        }
      })
  })
}

/**
 * Initiate the async sequence for answering to $nodewar
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
export function nodewarCheck(message) {
  checkIfTableExists(message)
}

//Check if we have a nodewar
function checkIfNodeWarIsActive(conn, nwObject, message) {
  rethink
    .db("test")
    .table("nodewar")
    .filter({isActive: true})
    .run(conn, function(err, cursor) {
      if (err) throw err
      cursor.toArray(function(err, result) {
        if (err) throw err
        if (result.length == 1) {
          updateCurrentNodeWar(conn, nwObject)
          message.reply(`Modifying the current nodewar`)
        }
        if (result.length == 0) {
          insertNewNodeWar(conn, nwObject)
          message.reply("Creating a new nodewar")
        }
        if (result.length > 1) {
          message.reply("DB ERROR, need to be resynced.")
        }
      })
    })
}

//Update a node war
function updateCurrentNodeWar(conn, nwObject) {
  rethink
    .db("test")
    .table("nodewar")
    .filter({isActive: true})
    .update({date: nwObject.date})
    .run(conn, function(err, result) {
      if (err) throw err
      console.log(JSON.stringify(result, null, 2))
    })
  console.log("Updated nodewar.")
}

//Insert a node war
function insertNewNodeWar(conn, nwObject) {
  console.log(nwObject)
  rethink
    .db("test")
    .table("nodewar")
    .insert(nwObject)
    .run(conn, function(err, result) {
      if (err) throw err
      console.log(JSON.stringify(result, null, 2))
    })
  console.log("Created nodewar")
}

//fetch the active nodewar, then respond to the message based on the result.
function fetchActiveNodewar(message) {
  return rethink.connect({host: "localhost", port: 28015}).then(function(conn) {
    rethink
      .db("test")
      .table("nodewar")
      .filter({isActive: true})
      .run(conn, function(err, cursor) {
        if (err) throw err
        cursor.toArray(function(err, result) {
          if (err) throw err
          console.log("fetchActiveNodewar result")
          respondNodewar(message, result)
        })
      })
  })
}

//Create nodewar table if we don't have it, then fetch the active nodewar.
function checkIfTableExists(message) {
  return rethink.connect({host: "localhost", port: 28015}).then(function(conn) {
    rethink
      .db("test")
      .tableList()
      .run(conn)
      .then(function(result) {
        console.log(result)
        if (result.includes("nodewar")) {
          console.log("We got nodewar")
          fetchActiveNodewar(message)
        } else {
          console.log("We create nodewar")
          rethink
            .db("test")
            .tableCreate("nodewar")
            .run(conn)
            .then(function(result) {
              console.log(result)
              fetchActiveNodewar(message)
            })
        }
      })
  })
}

//The actual response sent by the bot.
function respondNodewar(message, result) {
  if (result.length == 1) {
    let fDate = moment(result[0].date).format("dddd, MMMM Do YYYY")
    setNodewarTopic(message, `Nodewar => ${fDate} !`)
    message.reply(`Nodewar scheduled for ${fDate}.`)
  } else {
    message.reply("When would you like to create a nodewar?")
  }
}

//Set the topic for the nw channel
function setNodewarTopic(message, topic) {
  const nodeWarChannel = message.member.guild.channels.find(
    "name",
    "memewar-discussion"
  )
  nodeWarChannel.setTopic(topic)
}
