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
function clearNodeWar(message){
  let nwObject =
  {
    "date" : "",
    "createdAt" : "",
    "creatorId" : message.member.id
  };
  let nwString = JSON.stringify(nwObject)
  fs.writeFile(nodewarPath, nwString, (err) => console.error);
  message.reply(`TEMP:nodewar successfully cleared ${nwString}`);
}

/**
 * Handle nodewar related commands.
 * @param  {[type]} msg    [description]
 * @param  {[type]} client [description]
 * @return {[type]}        [description]
 */
export function handleNodeWar(msg, client){
  const keyword = "$nodewar";
  if(msg.content.startsWith(keyword)){
    console.log('UPSchan specific nodewar command');
    let channel = msg.channel;
    let args = msg.content.slice(1).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    let firstArg = args[0];


    console.log(JSON.stringify(args));

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
    if(firstArg === "help"){
      channel.send("**Welcome to the UPS nodewar system** \n *Admin commands :* \n   -'$nodewar date' creates a Nodewar event at the specified date. Today, tomorrow, sunday etc are considered valid dates. Otherwise you can use a regular dd/mm/yyyy format. \n   -'nodewar clear' Clears the current nodewar evenet. \n   *Regular commands :* \n  - '$attend' set your role to attending. \n  - '$cancel' remove yourself from the attending list. \n   - '$nwlist' list all the attending participants.");
      return;
    }
    //Clear command
    if(firstArg === "clear"){
      clearNodeWar(msg);
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
}
