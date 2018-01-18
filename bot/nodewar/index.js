import moment from "moment-timezone"
import Sugar from "sugar"
import rethink from 'rethinkdb'
const fs = require("fs")
// const schedule = require("node-schedule")

const timezone = "Europe/Paris";
const authorizedRolesIds = ["312317944417878016", "341182224139419650", "316283334768459777"];

/**
 * NodeWar Handler
 * @param  {[type]} msg    [description]
 * @param  {[type]} client [description]
 * @return {[type]}        [description]
 */
export function handleNodeWar(msg, client){
  const keynodewar = "$nodewar";
  const keylist = "$nwlist";
  const keyattend = "$attend";
  const keycancel = "$cancel";
  const nodeWarChannel = msg.member.guild.channels.find('name', 'memewar-discussion'); // Use channelID instead of name
  const attendingRole = msg.member.guild.roles.find('name', 'Attending'); // Use roleID instead of the name

  if(msg.content.startsWith(keynodewar)){
    nodewarManager(msg, client, nodeWarChannel, attendingRole);
  }
  if(msg.content.startsWith(keylist)){
    listAttendingMembers(msg, nodeWarChannel, attendingRole);
  }
  if(msg.content.startsWith(keyattend)){
    attendNodeWar(msg, nodeWarChannel, attendingRole);
  }
  if(msg.content.startsWith(keycancel)){
    cancelNodeWarAttendance(msg, nodeWarChannel, attendingRole);
  }
}

/**
 * Attend a Nodewar
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
function attendNodeWar(msg, channel, role){
    // Assign the role to the member
    msg.member.addRole(role).catch(console.error);
    // Send the message, mentioning the member
    msg.reply('As you wish.');
    channel.send(msg.member.user.username + ' will attend at the upcoming memewar!'); // TAG the user
}


/**
 * Cancel an attendance to a NodeWar
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
function cancelNodeWarAttendance(msg, channel, role){
   // Remove the role from the member
   msg.member.removeRole(role).catch(console.error);
   // Send the message, mentioning the member
   msg.reply('Your will, my hands.');
   channel.send(msg.member.user.username + ' will not attend! Next time fosure though.');
}

/**
 * List attending members.
 * @param  {[type]} msg     [description]
 * @param  {[type]} channel [description]
 * @param  {[type]} role    [description]
 * @return {[type]}         [description]
 */
function listAttendingMembers(msg, channel, role) {
    //Check for roles
    //If no auth we return early
    if(!canCreateNodeWar(msg.member)) {
      msg.reply("Ask one of your overlords.")
      return;
    }
    // Assign the cached members of the role 'Attending' to the variable
    let nwlist = msg.member.guild.roles.find('name', role.name).members;
    // Send the message, mentioning the member
    let nameList = [];
    nwlist.forEach(m => nameList.push(m.user.username));
    console.log(nameList);
    if (nwlist.size > 0) {
      msg.channel.send(`**Here is a list of all attendees for the upcoming memewar :**\n ${nameList.join('\n ')} \n That is a total of **${nwlist.size}** people.`);
    } else {
      msg.channel.send('There are no participants for the upcoming memewar yet.')
    }
}

/**
 * Check if a member has specifics ids;
 * @param  {[type]} member [description]
 * @return {[type]}        [description]
 */
function canCreateNodeWar(member){
  console.log("Can you ?");
  return (member.roles.some(r=>authorizedRolesIds.includes(r.id)))?true:false;
}

/**
 * Handle nodewar related commands.
 * @param  {[type]} msg    [description]
 * @param  {[type]} client [description]
 * @return {[type]}        [description]
 */
function nodewarManager(msg, client, nodeWarChannel, attendingRole){
  console.log('UPSchan specific $nodewar commands');
  let channel = msg.channel;
  let args = msg.content.slice(1).trim().split(/ +/g);
  let command = args.shift().toLowerCase();
  let firstArg = args[0];

  console.log(JSON.stringify(args));
  //Help
  if(firstArg === "help"){
    msg.member.user.createDM().then(function(DM){
      DM.send("**Welcome to the UPS nodewar system** \n*Regular commands :* \n  - **$attend** set your role to attending. \n  - **$cancel** remove yourself from the attending list. \n*Admin commands :* \n   - **$nwlist** list all the attending participants.\n   -**$nodewar *date* ** creates a Nodewar event at the specified date. \n   -**nodewar cancel** Cancel the current nodewar. \n   -**$nodewar win** End the current nodewar with a win. \n   -**$nodewar lose** End the current nodewar with a lose.");
    })
    return;
  }
  //If no auth we return early
  if(!canCreateNodeWar(msg.member)) {
    msg.reply("Gtfo scrub.")
    return;
  }
  //If only $nodewar is passed we do stuff
  if(args.length == 0){
    rethink.connect({host: 'localhost', port: 28015}).then(function(conn){
      rethink.db('test').table('nodewar').filter({isActive: true}).run(conn, function(err, cursor){
        if (err) throw err;
        cursor.toArray(function(err, result){
          if (err) throw err;
          console.log(result);
          if(result.length == 1){
            msg.reply(`Nodewar scheduled for ${moment.tz(result.date, timezone).format('dddd, MMMM Do YYYY')}.`)
          }else{
            msg.reply("When would you like to do a nodewar?");
          }
        })
      })
    });
    return;
  }

  //Clear command
  if(firstArg === "cancel"){
    cancelNodeWar(msg, nodeWarChannel, attendingRole);
    return;
  }

  if(firstArg === "win"){
    console.log('We won');
    endNodeWar(msg, nodeWarChannel, attendingRole, firstArg);
    return;
  }

  if(firstArg === "lose"){
    console.log('We lost');
    endNodeWar(msg, nodeWarChannel, attendingRole, firstArg);
    return;
  }
  //Assume that firstArg is a date, check if we're authorized to do so & that we have a date
  if(canCreateNodeWar(msg.member) && firstArg) {
    Sugar.Date.setLocale('en-GB');
    let sugarDate = Sugar.Date.create(firstArg);
    let tzDate = moment.tz(sugarDate, timezone);
    if(tzDate.isValid()){
      msg.reply(`Greetings Sir, let's do a nodewar on the ${tzDate.format('dddd, MMMM Do YYYY')}`);
      createNodeWar(msg, tzDate);
    }else{
      msg.reply("I'm sorry Sir, the date you told me is invalid.")
    }
  }
}

/**
 * Write a nodewar event to the filesystem.
 * @param  {[type]} message [description]
 * @param  {[type]} date    [description]
 * @return {[type]}         [description]
 */
function createNodeWar(message, date){
  console.log('Creating nodewar');
  let endDate = date.add({hours:10, minutes:30});
  let nwObject =
  {
    "isActive": true,
    "victory": false,
    "date" : date.format(),
    "createdAt" : moment.tz(moment(), timezone).format(),
    "creatorId" :  message.member.id,
    "attendingMembers": 0
  };
  // 1.Check that we have the table
  // 2.Check that currrent nodewar is over
  // 3. Create a nodewar Entry
  rethink.connect({host: 'localhost', port: 28015}).then(function(conn){
    rethink.db('test').tableList().run(conn).then(function(result){
      console.log(result);
      if(result.includes('nodewar')){
        console.log('Letscheck');
        checkIfNodeWarIsActive(conn);
      }else{
        console.log('Letscreate and check');
        rethink.db('test').tableCreate('nodewar').run(conn).then((conn) => checkIfNodeWarIsActive(conn));
      };
    })
  });

  //Check if we have a nodewar
  function checkIfNodeWarIsActive(conn){
    rethink.db('test').table('nodewar').filter({isActive: true}).run(conn, function(err, cursor){
      if (err) throw err;
      cursor.toArray(function(err, result){
        if (err) throw err;
        if(result.length == 1){
          updateCurrentNodeWar(conn);
          message.reply(`Modifying the current nodewar`);
        }
        if(result.length == 0){
          insertNewNodeWar(conn);
          message.reply('Creating a new nodewar');
        }
        if(result.length > 1){
          message.reply('DB ERROR, need to be resynced.');
        }
      })
    })
  }

  //Update a node war
  function updateCurrentNodeWar(conn){
    rethink.db('test').table('nodewar').filter({isActive: true}).update({ date: date.format()}).run(conn, function(err, result){
      if (err) throw err
      console.log(JSON.stringify(result, null, 2));
    });
    console.log('Updated nodewar.')
  }

  //Insert a node war
  function insertNewNodeWar(conn){
    console.log(nwObject);
    rethink.db('test').table('nodewar').insert(nwObject).run(conn, function(err, result){
      if (err) throw err
      console.log(JSON.stringify(result, null, 2));
    });
    console.log('Created nodewar');
  }
}

/**
 * End a nodewar
 * @param  {[Object]} message [The initial message]
 * @param  {[Object]} channel [The Nodewar channel]
 * @param  {[Object]} role    [The Attending Role]
 * @param  {[String]} result  [Win or Lose]
 * @return {[type]}         [description]
 */
function endNodeWar(message, channel, role, result){
  //1.Fetch the current nodewar.
  //2. Update it with the results
  //3. Clear the attendingmembers.
  let victory;
  if(result == "win"){ victory = true }
  if(result == "lose"){ victory = false}
  let updatedNW = { isActive: false, victory: victory, attendingMembers: message.member.guild.roles.find('name', role.name).members.map(m => m.user.id)};
  rethink.connect({host: 'localhost', port: 28015}).then(function(conn){
    rethink.db('test').table('nodewar').filter({isActive: true}).update(updatedNW).run(conn, function(err, result){
      if (err) throw err
      console.log(JSON.stringify(result, null, 2));
      if(victory){
        message.channel.send(`Congratulations to @everyone for this insane win !!!`);
      }else{
        message.channel.send('NextTime 4sure.');
      }
      clearAttendingMembers(message, channel, role);
    });
  });
}

/**
 * Cancel a nodewar event from the db.
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function cancelNodeWar(message, channel, role){
  rethink.connect({host: 'localhost', port: 28015}).then(function(conn){
    rethink.db('test').table('nodewar').filter({isActive: true}).delete().run(conn, function(err, result){
      if (err) throw err
      console.log(JSON.stringify(result, null, 2));
      message.reply(`NodeWar successfully canceled.`);
      clearAttendingMembers(message, channel, role);
    });
  });
}

/**
 * Clear the attending members.
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function clearAttendingMembers(message, channel, role){
  message.member.guild.roles.find('name', role.name).members.forEach(member => member.removeRole(role).catch(console.error));
  message.channel.send(`The attending roles have been correctly removed.`);
}
