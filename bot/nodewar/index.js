import moment from "moment-timezone"
import Sugar from "sugar"
import schedule from "node-schedule"
const fs = require("fs")
// const schedule = require("node-schedule")

const nodewarPath = '../../nodewar.json';
const timezone = "Europe/Paris";
const authorizedRolesIds = ["312317944417878016", "341182224139419650", "316283334768459777"];

let nodewar = require(nodewarPath);

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
    NodeWarManager(msg, client, nodeWarChannel, attendingRole);
  }
  if(msg.content.startsWith(keylist)){
    listAttendees(msg, nodeWarChannel, attendingRole);
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
    msg.reply('As your wish.');
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

// List all attendees for next nodewar
function listAttendees(msg, channel, role) {
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
 * Handle nodewar related commands.
 * @param  {[type]} msg    [description]
 * @param  {[type]} client [description]
 * @return {[type]}        [description]
 */

function NodeWarManager(msg, client, nodeWarChannel, attendingRole){
  console.log('UPSchan specific nodewar command');
  let channel = msg.channel;
  let args = msg.content.slice(1).trim().split(/ +/g);
  let command = args.shift().toLowerCase();
  let firstArg = args[0];


  console.log(JSON.stringify(args));

  if(firstArg === "help"){
    channel.send("**Welcome to the UPS nodewar system** \n *Admin commands :* \n   -'$nodewar date' creates a Nodewar event at the specified date. Today, tomorrow, sunday etc are considered valid dates. Otherwise you can use a regular dd/mm/yyyy format. \n   -'nodewar clear' Clears the current nodewar evenet. \n   *Regular commands :* \n  - '$attend' set your role to attending. \n  - '$cancel' remove yourself from the attending list. \n   - '$nwlist' list all the attending participants.");
    return;
  }
  //If no auth we return early
  if(!canCreateNodeWar(msg.member)) {
    msg.reply("Gtfo scrub.")
    return;
  }
  //If only $nodewar is passed we do stuff
  if(args.length == 0){
    if(!nodewar.date.length == 0){
      msg.reply("When would you like to do a nodewar?");
    }else{
      msg.reply(`Nodewar scheduled for ${moment(nodewar.date).format('dddd, MMMM Do YYYY')}.`);
    }
    return;
  }
  //Clear command
  if(firstArg === "clear"){
    clearNodeWar(msg, nodeWarChannel, attendingRole);
    return;
  }
  //Assume that firstArg is a date, check if we're authorized to do so & that we have a date
  if(canCreateNodeWar(msg.member) && firstArg) {
    Sugar.Date.setLocale('en-GB');
    let sugarDate = Sugar.Date.create(firstArg);
    let tzDate = moment.tz(sugarDate, timezone);
    if(tzDate.isValid()){
      msg.reply(`Greetings mylord, let's do a nodewar on the ${tzDate.format('dddd, MMMM Do YYYY')}`);
      createNodeWar(msg, tzDate);
    }else{
      msg.reply("I'm sorry mylord, the date you told me is invalid.")
    }
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
 * Write a nodewar event to the filesystem.
 * @param  {[type]} message [description]
 * @param  {[type]} date    [description]
 * @return {[type]}         [description]
 */
function createNodeWar(message, date){
  console.log('Creating nodewar');
  let nwObject =
  {
    "date" : date.format(),
    "createdAt" : moment.tz(moment(), timezone),
    "creatorId" :  message.member.id
  };
  let nwString = JSON.stringify(nwObject)
  console.log(nwString);
  fs.writeFile(nodewarPath, nwString, (err) => console.error);

  let endDate = date.add({hours:10, minutes:30});
  console.log(new Date(endDate.format()));
  let scheduledNodewar = schedule.scheduleJob("Nodewar", new Date(endDate.format()), function(){
    console.log('Scheduled clear.');
    clearNodeWar(message);
  });

  // console.log(scheduledNodewar);
  // let testDate = moment.tz(moment().add({seconds:5}), timezone);
  // console.log(moment().format());
  // console.log(testDate.format());
  // let k = schedule.scheduleJob("Test", new Date(testDate.format()), function(){
  //   console.log('ding');
  //   message.reply('TEST OK');
  // });

  // message.channel.send(`Nodewar on ${moment(nodewar.date).format('dddd, MMMM Do YYYY')}, scheduled to end at ${scheduledNodewar.nextInvocation().format('HH:mm')}.`)

  message.reply(`TEMP:nodewar successfully created ${nwString}`);
}

/**
 * Clear a nodewar event from the filesystem.
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function clearNodeWar(message, channel, role){
  let nwObject =
  {
    "date" : "",
    "createdAt" : "",
    "creatorId" : message.member.id
  };
  let nwString = JSON.stringify(nwObject)
  clearAttendingMembers(message, channel, role);
  fs.writeFile(nodewarPath, nwString, (err) => console.error);
  message.reply(`TEMP:nodewar successfully cleared ${nwString}`);
}

/**
 * Clear the attending members.
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function clearAttendingMembers(message, channel, role){
  message.member.guild.roles.find('name', role.name).members.forEach(member => member.removeRole(role).catch(console.error));
  message.channel.send(`TEMP:Removed attending role for everyone`);
}
