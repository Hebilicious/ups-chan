require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireDefault");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireWildcard");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomMeeseeksInteraction = getRandomMeeseeksInteraction;
exports.getRandomGoodLuckMessage = getRandomGoodLuckMessage;
exports.getRandomDontSpoilMessage = getRandomDontSpoilMessage;
exports.getRandomLossMessage = getRandomLossMessage;
exports.getRandomWinMessage = getRandomWinMessage;
exports.getRandomOkMessage = getRandomOkMessage;

function randomMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomMeeseeksInteraction() {
  var messages = ["👋 Hey Mr Meeseeks, look at me !! 👋", "I'm 10 times better than you!", "I didn't do this!", "You bringed me into this!", "I could do the same thing.", "Is that all you can do ?"];
  return randomMessage(messages);
}

function getRandomGoodLuckMessage() {
  var messages = ["I believe.", "May the force be with you.", "The force will be with you. Always.", "Blessed be the RNG gods.", "Lib would get it first try.", "Alzy has done it twice.", "DO IT.", "Do you trust me?", "You were made for this.", "You can do it.", "Yup. We're going for it.", "We're doing it.", "Evie would not hesitate.", "Remember than someone failed TRI ogre 12 times tho..."];
  return randomMessage(messages);
}

function getRandomDontSpoilMessage() {
  var messages = ["Spoiler are the path to the dark side.", "For the night is long, and full of spoilers.", "10% luck, 20 % skill, 5% pleasure, 0% spoiler", "Dumbledore is dead.", "I AM your father!", "No spoiler here.", "Another day on the job son. No spoiler.", "You shall not spoil !", "If I live, spoiler shall die!", "Get down !!!", "I'll protect you from the spoils <3"];
  return randomMessage(messages);
}

function getRandomLossMessage() {
  var messages = ["GG, we got zerged.", "NextTime 4sure.", "Bad round.", "Can we redo, I had to scratch my nose?", "Unlucky I guess.", "GG boys... See you next week...", "Just numbers."];
  return randomMessage(messages);
}

function getRandomWinMessage() {
  var messages = ["Congratulations to @everyone for this insane win !!!", "GG. I hope I was more funny and clever.", "GG Germany won, once again ...", "GG, Welcome to Alustin.", "Croxus got defeated once again! GG.", "GG, big thanks to JLN, once again.", "GG EZ sniped node EZ", "GG boys! See you next week."];
  return randomMessage(messages);
}

function getRandomOkMessage() {
  var messages = ["As you wish.", "Your will, my hands.", "Your wishes, my commands.", "At your service.", "Of course master.", "I obey.", "I'm yours to command.", "Anything to please you my lord.", "Yes please daddy.", "Oh yeah, that's the spot baby...", "I heard lib is a woman, is that true ?? Uh I'm sorry that's the wrong message !! I meant : Yes master.", "Without hesitation.", "Yes master.", "Right away sir.", "Sir, yes sir.", "Rush b cyka blyat.. *enables english* Yes mylord.", "Gladly", "Whatever you say.", "It's not like i wanted to do that >_<", "I would have you right now on this table until you beg for mercy twice."];
  return randomMessage(messages);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Connect = Connect;
exports.UpdateConfiguration = UpdateConfiguration;
exports.UpdateConfigurationArray = UpdateConfigurationArray;
exports.syncConnectedServers = syncConnectedServers;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(5));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(19));

var r = __webpack_require__(20)();
/**
 * Connect to a specified guild database.
 * @param {Guild} guild
 */


function Connect(guild) {
  console.log("Connecting to the DB of ".concat(guild.name));
  return r.db(guild.id);
}

function UpdateConfiguration(guild, updates) {
  console.log("Updating Configuration....");
  return Connect(guild).table("configuration").get(0).update(updates).run();
}

function UpdateConfigurationArray(guild, key, updates) {
  var remove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  console.log(key);
  console.log(updates);
  console.log(remove);
  return remove ? Connect(guild).table("configuration").get(0).update((0, _defineProperty2.default)({}, key, r.row(key).difference(updates))).run() : Connect(guild).table("configuration").get(0).update((0, _defineProperty2.default)({}, key, r.row(key).append(updates))).run();
}
/**
 * Sync the connected guilds (servers) with the db backend by creating
 * the tables if they don't exist.
 * @param {Client} client
 */


function syncConnectedServers(_x) {
  return _syncConnectedServers.apply(this, arguments);
}

function _syncConnectedServers() {
  _syncConnectedServers = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(client) {
    var dbList;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return r.dbList().run();

          case 2:
            dbList = _context.sent;
            console.log(dbList);
            client.guilds.forEach(function (guild) {
              // console.log(guild.id)
              if (!dbList.includes(guild.id)) {
                console.log("Creating DB ".concat(guild.id, " (").concat(guild.name, ")."));
                r.dbCreate(guild.id).run().then(function (result) {
                  r.db(guild.id).tableCreate("nodewar").run();
                  r.db(guild.id).tableCreate("configuration").run().then(function (result) {
                    r.db(guild.id).table("configuration").insert({
                      id: 0,
                      nodeWarChannel: "",
                      attendingRole: "Attending",
                      adminRolesIds: []
                    }).run().then(function (result) {
                      return console.log("The fresh DB ".concat(guild.id, " (").concat(guild.name, ") is ready."));
                    });
                  });
                });
              } else {
                console.log("Found DB ".concat(guild.id, " (").concat(guild.name, "), ready to use."));
              }
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _syncConnectedServers.apply(this, arguments);
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/entries");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmbedHelpAsDM = sendEmbedHelpAsDM;

var _momentTimezone = _interopRequireDefault(__webpack_require__(6));

var timezone = "Europe/Paris";

function sendEmbedHelpAsDM(message, client, fields) {
  sendDM(message, client, {
    embed: {
      color: 16753920,
      title: "".concat(message.member.displayName, " customized UPS-Chan help \uD83D\uDC97"),
      url: "https://www.ups.com",
      description: "This is a list of all the commands.",
      fields: fields,
      timestamp: (0, _momentTimezone.default)().tz(timezone),
      footer: {
        icon_url: client.user.avatarURL,
        text: client.user.username
      }
    }
  });
}

function sendDM(message, client, content) {
  message.member.user.createDM().then(function (DM) {
    return DM.send(content);
  });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(1);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkMemberForRolesIds = checkMemberForRolesIds;
exports.isPrivileged = isPrivileged;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(5));

var DB = _interopRequireWildcard(__webpack_require__(3));

//Mom&Dad,WeebOverlords,Lider,Test
// export const authorizedRolesIds = [
//   "312317944417878016",
//   "341182224139419650",
//   "316283334768459777",
//   "248702697610412032"
// ]
function checkMemberForRolesIds(member, rolesIds) {
  return member.roles.some(function (r) {
    return rolesIds.includes(r.id);
  }) ? true : false;
}

function isPrivileged(_x) {
  return _isPrivileged.apply(this, arguments);
}

function _isPrivileged() {
  _isPrivileged = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(member) {
    var conf;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return DB.Connect(member.guild).table("configuration").get(0).run();

          case 2:
            conf = _context.sent;
            return _context.abrupt("return", member.permissions.has("ADMINISTRATOR") || checkMemberForRolesIds(member, conf.adminRolesIds));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _isPrivileged.apply(this, arguments);
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/json/stringify");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendHelp = sendHelp;
exports.canCreateNodeWar = canCreateNodeWar;
exports.clearAttendingMembers = clearAttendingMembers;
exports.attendNodeWar = attendNodeWar;
exports.cancelNodeWarAttendance = cancelNodeWarAttendance;
exports.listAttendingMembers = listAttendingMembers;

var Messages = _interopRequireWildcard(__webpack_require__(2));

var _authorization = __webpack_require__(12);

var _functions = __webpack_require__(11);

function sendHelp(message, client) {
  var fields = [{
    name: "__Nodewar commands__",
    value: "- **$attend** - set your role to *Attending*.\n- **$cancel** - remove yourself from the *Attending* list.\n- **$nodewar** - tells you the date for the the upcoming nodewar."
  }, {
    name: "__Nodewar administrator commands__",
    value: "- **$nwlist** - list all the participants for the upcoming nodewar.\n- **$nodewar *date*** - creates a nodewar event at the specified date.\n- **$nodewar cancel** - cancel the current nodewar\n- **$nodewar win** - end the current nodewar with a win.\n- **$nodewar loss** - end the current nodewar with a loss."
  }, {
    name: "__ServerAdmin Nodewar commands__",
    value: "- **$nodewar channel *channelName*** - Change the nodewar channel used by UPS-chan.\n- **$nodewar role add *roleName*** - Add a role to the authorized nodewar roles.\n- **$nodewar role remove *roleName*** - Remove a role from the authorized nodewar roles."
  }];
  (0, _functions.sendEmbedHelpAsDM)(message, client, fields);
}
/**
 * Check if a member can create a nodewar
 * @param  {[type]} member [description]
 * @return {[type]}        [description]
 */


function canCreateNodeWar(member, rolesIds) {
  console.log("is admin ? : " + member.permissions.has("ADMINISTRATOR"));
  console.log("roles Ids :" + rolesIds.toString());
  return member.permissions.has("ADMINISTRATOR") || (0, _authorization.checkMemberForRolesIds)(member, rolesIds);
}
/**
 * Clear the attending members.
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */


function clearAttendingMembers(message, channel, role) {
  message.member.guild.roles.find("name", role.name).members.forEach(function (member) {
    return member.removeRole(role).catch(console.error);
  });
  message.channel.send("The attending roles have been correctly removed.");
}
/**
 * Attend a Nodewar
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */


function attendNodeWar(msg, channel, role) {
  // Assign the role to the member
  msg.member.addRole(role).catch(console.error); // Send the message, mentioning the member

  msg.member.user.createDM().then(function (DM) {
    DM.send(Messages.getRandomOkMessage());
  }); // msg.reply("As you wish.")

  channel.send(msg.member.user.username + " will attend at the upcoming memewar!"); // TAG the user
}
/**
 * Cancel an attendance to a NodeWar
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */


function cancelNodeWarAttendance(msg, channel, role) {
  // Remove the role from the member
  msg.member.removeRole(role).catch(console.error); // Send the message, mentioning the member

  msg.member.user.createDM().then(function (DM) {
    DM.send(Messages.getRandomOkMessage());
  });
  channel.send(msg.member.user.username + " will not attend! Next time fosure though.");
}
/**
 * List attending members.
 * @param  {[type]} message     [description]
 * @param  {[type]} channel [description]
 * @param  {[type]} role    [description]
 * @return {[type]}         [description]
 */


function listAttendingMembers(message, channel, role, conf) {
  //Check for roles
  //If no auth we return early
  if (!canCreateNodeWar(message.member, conf.adminRolesIds)) {
    message.reply("Ask one of your overlords.");
    return;
  } // Assign the cached members of the role 'Attending' to the variable


  var nwlist = message.member.guild.roles.find("name", role.name).members; // Send the message, mentioning the member

  var nameList = [];
  nwlist.forEach(function (m) {
    return nameList.push("- " + m.displayName);
  });
  console.log(nameList);
  nameList = nameList.join("\n ");

  if (nwlist.size > 0) {
    message.channel.send("**Here's a list of everyone who's attending to the upcoming nodewar :**\n ".concat(nameList, " \n That is a total of **").concat(nwlist.size, "** people."));
  } else {
    message.channel.send("There are no participants for the upcoming nodewar yet.");
  }
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(1);

var _interopRequireDefault = __webpack_require__(0);

var _extends2 = _interopRequireDefault(__webpack_require__(18));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(9));

var _entries = _interopRequireDefault(__webpack_require__(10));

var DB = _interopRequireWildcard(__webpack_require__(3));

var rCommands = _interopRequireWildcard(__webpack_require__(21));

var aCommands = _interopRequireWildcard(__webpack_require__(22));

var events = _interopRequireWildcard(__webpack_require__(23));

var _nodewar = __webpack_require__(27);

var _spoiler = __webpack_require__(31);

var _enhancing = __webpack_require__(37);

var Discord = __webpack_require__(44);

var auth = __webpack_require__(45);

var client = new Discord.Client();

/**
 * Here we have to call this to initiate the bot.
 */
client.on("ready", function () {
  console.log("Logged in as ".concat(client.user.tag, "!")); //Sync the DB with every server.

  DB.syncConnectedServers(client);
  client.user.setPresence({
    game: {
      name: "Waiting for Lahn",
      url: "http://twitch.tv/fix8radio",
      type: "STREAMING"
    }
  });
});
/**
 * Sync the DB when we join a new server.
 */

client.on("guildCreate", function () {
  return DB.syncConnectedServers(client);
});
/**
 * To our very special princess...
 */

client.on("message", function (message) {
  if (message.content === "I love you.") {
    // console.log(message.member.roles)
    message.reply("I know.");
  }
});
/**
 * Fancy event handler!
 * @type {[type]}
 */

(0, _entries.default)(events).forEach(function (_ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      event = _ref2[1];

  var e = new event();
  client.on(e.eventName, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    e.handleEvent.apply(e, [client].concat(args));
  });
});
/**
 * Call a custom command on each message.
 */

client.on("message", function (message) {
  // console.log(`New message : ${message}`)
  // console.log(`User:${message.author.username}, ID: ${message.author.id}`)
  if (message.member != null && message.guild != null) {
    //Pass the message to all the commands ES2016+ PogChamp.
    var commands = (0, _extends2.default)({}, rCommands, aCommands);
    (0, _entries.default)(commands).forEach(function (_ref3) {
      var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
          command = _ref4[0],
          call = _ref4[1];

      return call(message, client);
    });
    (0, _spoiler.spoilThisContent)(message, client);
    (0, _nodewar.handleNodeWar)(message, client);
    (0, _enhancing.handleEnhance)(message, client);
  } else {
    console.log("No member or no guild found!");
  }
});
/**
 * This logs the bot in with the token from auth.json
 */

client.login(auth.token);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("rethinkdbdash");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.meeseeksAnswer = meeseeksAnswer;
exports.ups = ups;
exports.secretAlzy = secretAlzy;
exports.pedoAge = pedoAge;
exports.grammar = grammar;
exports.help = help;

var _momentTimezone = _interopRequireDefault(__webpack_require__(6));

var _functions = __webpack_require__(11);

var _messages = __webpack_require__(2);

var timezone = "Europe/Paris";

function meeseeksAnswer(message, client) {
  //MeeseeksBOT ID
  if (message.author.id == "159985870458322944") {
    message.channel.send((0, _messages.getRandomMeeseeksInteraction)()).then(function (m) {
      setTimeout(function () {
        m.delete();
      }, 2500);
    });
  }
}

function ups(message, client) {
  var regex = /(\bups\b)+/gim;
  var randomly = Math.floor(Math.random() * 4);

  if (regex.test(message.content) && randomly == 1) {
    message.react("🇺").then(function () {
      return message.react("🇵");
    }).then(function () {
      return message.react("🇸");
    }).then(function () {
      var emoji = message.guild.emojis.find("name", "PagChomp");
      message.react(emoji);
    }).catch(function () {
      return console.error("One of the emojis failed to react.");
    }); // message.react("316287767648927744")
  }
}

function secretAlzy(msg) {
  if (msg.content === "alzy") {
    console.log("Alzy !!"); // Send the message to a designated channel on a server:

    var channel = msg.member.guild.channels.find("name", "drama-super-important-and-private-stuff");
    console.log(channel); // Do nothing if the channel wasn't found on this server

    if (!channel) return; // Send the message, mentioning the member

    channel.send("https://cdn.discordapp.com/attachments/318482214071566336/402574859013455873/roar.PNG");
  }
}

function pedoAge(msg, client) {
  var regex = /(\bunderage\b|\bage\b)+/gim;
  var m; // console.log("I'm a bot ? " + msg.author.bot);

  var randomly = Math.floor(Math.random() * 2);

  if (randomly == 1 && msg.author.bot == false && (m = regex.exec(msg.content)) !== null) {
    console.log("Matched age somewhere...");
    var ePedoBear = client.emojis.find("name", "PedoBear") || ":)";
    var eKappa = client.emojis.find("name", "Kappa") || ":3";
    var reply = "".concat(ePedoBear, " Age is nothing but a number ... ").concat(eKappa); // console.log(reply);

    msg.reply(reply);
  }
}

function grammar(msg) {
  var ex = ["execpt", "exectp", "excpet", "excetp", "except", "excpect"];

  if (ex.some(function (w) {
    return msg.content.includes(w);
  })) {
    msg.reply("Expect. Expecting. ");
  }
}

function help(message, client) {
  if (message.content === "$help") {
    var fields = [{
      name: "__Commands__",
      value: "- **$nodewar help** - Gives you the nodewar help commands.\n- *topic* **$spoiler** *content* - Creates a spoiler for your content.\n- **$fs *tet ogre* Tells you an appropriate failstack number to slam your gear on."
    }, {
      name: "__Nodewar commands__",
      value: "- **$attend** - set your role to *Attending*.\n- **$cancel** - remove yourself from the *Attending* list.\n- **$nodewar** - tells you the date for the the upcoming nodewar."
    }, {
      name: "__Admin commands__",
      value: "- **$listEmojis** - List all the Emojis.\n- **$listRoles** - List all the Roles.\n- **$listChannels** - List all the Channels.\n"
    }, {
      name: "__Admin Nodewar commands__",
      value: "- **$nwlist** - list all the participants for the upcoming nodewar.\n- **$nodewar *date*** - creates a nodewar event at the specified date.\n- **$nodewar cancel** - cancel the current nodewar\n- **$nodewar win** - end the current nodewar with a win.\n- **$nodewar loss** - end the current nodewar with a loss."
    }];
    (0, _functions.sendEmbedHelpAsDM)(message, client, fields);
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listEmojis = listEmojis;
exports.listChannels = listChannels;
exports.listRoles = listRoles;

var _authorization = __webpack_require__(12);

// import * as Meeseeks from "../helpers.js"

/**
 * List Emojis the bot has access to.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */
function listEmojis(message, client) {
  if (message.content === "$listEmojis") {
    if (!(0, _authorization.isPrivileged)(message.member)) return;
    console.log("listing emojis");
    var emojiList = client.emojis.map(function (e) {
      return "**".concat(client.emojis.get(e.id), " Name**: ").concat(e.name, ", **Identifier**: ").concat(e.identifier, ", **ID:** ").concat(e.id);
    }); // let toSend = Meeseeks.superSplit(emojiList.join("\n"), 2000)

    message.channel.send(emojiList.join("\n"), {
      split: true
    }); // console.log(toSend);
    // emojiList.forEach(el => message.channel.send(el, { split: true }))
    // Meeseeks.superArraySplit(Array(50).fill(mock), 500).forEach(el => console.log(el))
  }
}
/**
 * List Emojis the bot has access to.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */


function listChannels(message, client) {
  if (message.content === "$listChannels") {
    console.log("listing channels");
    var channelList = message.member.guild.channels.map(function (c) {
      return "**$Name**: ".concat(c.name, ", **Type**: ").concat(c.type, ", **ID:** ").concat(c.id);
    });
    message.channel.send(channelList.join("\n"), {
      split: true
    });
  }
}
/**
 * List channels the bot has access to.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */


function listRoles(message, client) {
  if (message.content === "$listRoles") {
    console.log("listing roles");
    var roleList = message.member.guild.roles.map(function (r) {
      return "**$Name**: ".concat(r.name, ", **Members**: ").concat(r.members.size, ", **ID:** ").concat(r.id);
    });
    message.channel.send(roleList.join("\n"), {
      split: true
    });
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(1);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageReactionAdd = exports.guildMemberUpdate = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(5));

var _getPrototypeOf = _interopRequireDefault(__webpack_require__(24));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(25));

var _inherits2 = _interopRequireDefault(__webpack_require__(26));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(13));

var DB = _interopRequireWildcard(__webpack_require__(3));

/**
 * A base event class with some prototype methods.
 */
var Event =
/*#__PURE__*/
function () {
  function Event() {
    (0, _classCallCheck2.default)(this, Event);
    this.instantiate();
  }

  (0, _createClass2.default)(Event, [{
    key: "instantiate",
    value: function instantiate() {
      console.log("Event instancied");
    }
  }]);
  return Event;
}();
/**
 * Outputs something on a role change.
 */


var guildMemberUpdate =
/*#__PURE__*/
function (_Event) {
  (0, _inherits2.default)(guildMemberUpdate, _Event);

  function guildMemberUpdate() {
    var _this;

    (0, _classCallCheck2.default)(this, guildMemberUpdate);
    _this = (0, _possibleConstructorReturn2.default)(this, (guildMemberUpdate.__proto__ || (0, _getPrototypeOf.default)(guildMemberUpdate)).call(this));
    console.log("guildMemberUpdate ready");
    _this.eventName = "guildMemberUpdate";

    Array.prototype.diff = function (array) {
      return this.filter(function (x) {
        return !array.includes(x);
      });
    };

    return _this;
  }

  (0, _createClass2.default)(guildMemberUpdate, [{
    key: "handleEvent",
    value: function () {
      var _handleEvent = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(client, oldM, newM) {
        var conf, oldRoles, newRoles, ignore, removed, added, channel;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Handling " + this.eventName);
                _context.next = 3;
                return DB.Connect(oldM.guild).table("configuration").get(0).run();

              case 3:
                conf = _context.sent;
                oldRoles = oldM.roles.map(function (r) {
                  return r.name;
                });
                newRoles = newM.roles.map(function (r) {
                  return r.name;
                });
                ignore = [];
                ignore.push(conf.attendingRole);
                removed = oldRoles.diff(newRoles).diff(ignore);
                added = newRoles.diff(oldRoles).diff(ignore);
                channel = oldM.guild.channels.find("name", "general");
                console.log("Added ".concat(added, ", removed ").concat(removed));

                if (removed.length > 0) {
                  channel.send("".concat(oldM.displayName, " is no longer **").concat(removed.toString(), "**."));
                }

                if (added.length > 0) {
                  channel.send("".concat(oldM.displayName, " is now **").concat(added.toString(), "**."));
                }

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function handleEvent(_x, _x2, _x3) {
        return _handleEvent.apply(this, arguments);
      };
    }()
  }]);
  return guildMemberUpdate;
}(Event);
/**
 * React to stuff
 * @type {String}
 */


exports.guildMemberUpdate = guildMemberUpdate;

var messageReactionAdd =
/*#__PURE__*/
function (_Event2) {
  (0, _inherits2.default)(messageReactionAdd, _Event2);

  function messageReactionAdd() {
    var _this2;

    (0, _classCallCheck2.default)(this, messageReactionAdd);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (messageReactionAdd.__proto__ || (0, _getPrototypeOf.default)(messageReactionAdd)).call(this));
    console.log("messageReactionAdd ready");
    _this2.eventName = "messageReactionAdd";
    return _this2;
  }

  (0, _createClass2.default)(messageReactionAdd, [{
    key: "handleEvent",
    value: function handleEvent(client, messageReaction, user) {
      var emojiKey = messageReaction.emoji.id ? "".concat(messageReaction.emoji.name, ":").concat(messageReaction.emoji.id) : messageReaction.emoji.name; // Send :heartpulse: randomly on reactions
      // let randomly = Math.floor(Math.random() * 3)
      // if (user.id != client.user.id && randomly == 1) {
      //   messageReaction.message.react("💗")
      // }
      //Send LUL when LUL

      var lul = messageReaction.message.guild.emojis.find("name", "LUL");

      if (messageReaction.emoji == lul) {
        console.log("Found specific reaction");
        messageReaction.message.react(lul);
      }
    }
  }]);
  return messageReactionAdd;
}(Event);

exports.messageReactionAdd = messageReactionAdd;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/get-prototype-of");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/inherits");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(1);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNodeWar = handleNodeWar;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _values = _interopRequireDefault(__webpack_require__(28));

var _stringify = _interopRequireDefault(__webpack_require__(14));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(5));

var _momentTimezone = _interopRequireDefault(__webpack_require__(6));

var _sugar = _interopRequireDefault(__webpack_require__(29));

var Nodewar = _interopRequireWildcard(__webpack_require__(15));

var NodewarDB = _interopRequireWildcard(__webpack_require__(30));

var DB = _interopRequireWildcard(__webpack_require__(3));

// const schedule = require("node-schedule")
var timezone = "Europe/Paris"; //Mom&Dad,WeebOverlords,Lider,Test

/**
 * NodeWar Handler
 * @param  {[type]} message    [description]
 * @param  {[type]} client [description]
 * @return {[type]}        [description]
 */

function handleNodeWar(_x, _x2) {
  return _handleNodeWar.apply(this, arguments);
}

function _handleNodeWar() {
  _handleNodeWar = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(message, client) {
    var key, conf, nodewarChannel, attendingRole, filter;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            key = {};
            key.nodewar = "$nodewar";
            key.list = "$nwlist";
            key.attend = "$attend";
            key.cancel = "$cancel";

            if ((0, _values.default)(key).some(function (k) {
              return message.content.startsWith(k);
            })) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            _context.next = 9;
            return DB.Connect(message.guild).table("configuration").get(0).run();

          case 9:
            conf = _context.sent;
            // console.log(conf)
            nodewarChannel = conf.nodeWarChannel;
            attendingRole = conf.attendingRole;

            filter = function filter(m) {
              //Check that we have the same author and only 1 word
              if (m.author.id == message.author.id && m.content.split(" ".length == 1)) {
                console.log("Valid Answer");
                return true;
              }
            };

            if (!nodewarChannel) {
              //Handle auth
              message.channel.send("Please type-in the name of the channel you want to use for the nodewar features. \n **Existing channels** : \n".concat(message.member.guild.channels.filter(function (c) {
                return c.type == "text";
              }).map(function (c) {
                return "**-** ".concat(c.name);
              }).join("\n"))).then(function () {
                message.channel.awaitMessages(filter, {
                  maxMatches: 1,
                  time: 60000,
                  errors: ["time"]
                }).then(function (collected) {
                  // console.log(collected)
                  var nwChannel = collected.first().content;

                  if (!message.member.guild.channels.find("name", nwChannel)) {
                    message.member.guild.createChannel(nwChannel, "text").then(function (c) {
                      return console.log("Created new nodewar channel ".concat(c, "."));
                    }).then(function () {
                      return handleRouting(message, client, key, conf, nwChannel);
                    });
                  } else {
                    handleRouting(message, client, key, conf, nwChannel);
                  }
                });
              }).catch(console.error);
            } else {
              handleRouting(message, client, key, conf, nodewarChannel);
            }

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _handleNodeWar.apply(this, arguments);
}

function handleRouting(message, client, key, conf, channelName) {
  console.log("Handling key Routing");
  var nodeWarChannel = message.member.guild.channels.find("name", channelName);

  if (!nodeWarChannel || !conf.nodeWarChannel) {
    console.log("Updating configuration");
    DB.UpdateConfiguration(message.guild, {
      nodeWarChannel: channelName
    }).then(function () {
      var nodeWarChannel = message.member.guild.channels.find("name", channelName);
      message.channel.send(channelName + " is now the nodewar channel.");
    });
  }

  if (!conf.attendingRole) {
    console.log("Set an attending role.");
    return;
  }

  var role = message.member.guild.roles.find("name", conf.attendingRole);

  if (!role) {
    //Create Role
    console.log("Creating Attending role...");
    message.guild.createRole({
      name: conf.attendingRole,
      color: "GREEN"
    }).then(function (role) {
      return message.channel.send("Created role ".concat(role.name, "."));
    }).catch(console.error);
  }

  if (message.content.startsWith(key.nodewar)) {
    nodewarManager(message, client, nodeWarChannel, role, conf);
  }

  if (message.content.startsWith(key.list)) {
    Nodewar.listAttendingMembers(message, nodeWarChannel, role, conf);
  }

  if (message.content.startsWith(key.attend)) {
    Nodewar.attendNodeWar(message, nodeWarChannel, role);
  }

  if (message.content.startsWith(key.cancel)) {
    Nodewar.cancelNodeWarAttendance(message, nodeWarChannel, role);
  }
}
/**
 * Handle nodewar related commands.
 * @param  {[type]} message    [description]
 * @param  {[type]} client [description]
 * @return {[type]}        [description]
 */


function nodewarManager(message, client, nodeWarChannel, attendingRole, conf) {
  console.log("UPSchan specific $nodewar commands");
  var channel = message.channel;
  var node;
  var args = message.content.slice(1).trim().split(/ +/g);
  var command = args.shift().toLowerCase();
  var firstArg = args[0];
  var secondArg = args[1];
  console.log((0, _stringify.default)(args)); //Help

  if (firstArg === "help") {
    Nodewar.sendHelp(message, client);
    return;
  } //If no auth we return early


  if (!Nodewar.canCreateNodeWar(message.member, conf.adminRolesIds)) {
    message.reply("Gtfo scrub.");
    return;
  } //If only $nodewar is passed we do stuff


  if (args.length == 0) {
    NodewarDB.nodewarCheck(message);
    return;
  } //Cancel command


  if (firstArg === "cancel") {
    NodewarDB.cancelNodeWar(message, nodeWarChannel, attendingRole);
    return;
  } //Win command


  if (firstArg === "win") {
    console.log("VI VON ZULUL");
    NodewarDB.endNodeWar(message, nodeWarChannel, attendingRole, firstArg);
    return;
  } //Loss Command


  if (firstArg === "loss") {
    console.log("We lost");
    NodewarDB.endNodeWar(message, nodeWarChannel, attendingRole, firstArg);
    return;
  } //Changing NW Channel command


  if (firstArg === "channel" && message.member.permissions.has("ADMINISTRATOR")) {
    var c = message.member.guild.channels.find("name", secondArg);
    if (!c) return;
    DB.UpdateConfiguration(message.guild, {
      nodeWarChannel: c.name
    });
    message.reply("Nodewar channel successfully set.");
    return;
  } //Changing Privileged roles command


  if (firstArg === "role" && message.member.permissions.has("ADMINISTRATOR")) {
    console.log("Updating role");
    var r = message.member.guild.roles.find("name", args[2]);
    if (!r) return;

    if (secondArg === "add") {
      DB.UpdateConfigurationArray(message.guild, "adminRolesIds", r.id, false);
      message.reply("Privileged roles successfully added.");
    }

    if (secondArg === "remove") {
      DB.UpdateConfigurationArray(message.guild, "adminRolesIds", r.id, true);
      message.reply("Privileged roles successfully removed.");
    }

    return;
  } //Assume that firstArg is a date, check if we're authorized to do so & that we have a date


  if (Nodewar.canCreateNodeWar(message.member, conf.adminRolesIds) && firstArg) {
    _sugar.default.Date.setLocale("en-GB");

    var sugarDate = _sugar.default.Date.create(firstArg);

    var tzDate = _momentTimezone.default.tz(sugarDate, timezone);

    if (tzDate.isValid()) {
      message.reply("Well met! Let's do a nodewar on the ".concat(tzDate.format("dddd, MMMM Do YYYY")));
      NodewarDB.createNodeWar(message, tzDate);
    } else {
      message.reply("I'm sorry, the date you told me is invalid. :(");
    }
  }
}

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/values");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("sugar");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(1);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endNodeWar = endNodeWar;
exports.cancelNodeWar = cancelNodeWar;
exports.createNodeWar = createNodeWar;
exports.nodewarCheck = nodewarCheck;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(5));

var _stringify = _interopRequireDefault(__webpack_require__(14));

var _momentTimezone = _interopRequireDefault(__webpack_require__(6));

var Messages = _interopRequireWildcard(__webpack_require__(2));

var DB = _interopRequireWildcard(__webpack_require__(3));

var _features = __webpack_require__(15);

// const r = require("rethinkdbdash")({db: "test"})
var timezone = "Europe/Paris";
/**
 * End a nodewar
 * @param  {[Object]} message [The initial message]
 * @param  {[Object]} channel [The Nodewar channel]
 * @param  {[Object]} role    [The Attending Role]
 * @param  {[String]} result  [Win or Loss]
 * @return {[type]}         [description]
 */

function endNodeWar(message, channel, role, result) {
  //1.Fetch the current nodewar.
  //2. Update it with the results
  //3. Clear the attendingmembers.
  var victory;

  if (result == "win") {
    victory = true;
  }

  if (result == "loss") {
    victory = false;
  }

  var updatedNW = {
    isActive: false,
    victory: victory,
    attendingMembers: message.member.guild.roles.find("name", role.name).members.map(function (m) {
      return m.user.id;
    })
  };
  DB.Connect(message.guild).table("nodewar").filter({
    isActive: true
  }).update(updatedNW).run().then(function (result) {
    console.log((0, _stringify.default)(result, null, 2));

    if (victory) {
      message.channel.send(Messages.getRandomWinMessage());
      setNodewarTopic(message, "EZ game EZ win EZ");
    } else {
      message.channel.send(Messages.getRandomLossMessage());
      setNodewarTopic(message, "We got unlucky.");
    }

    (0, _features.clearAttendingMembers)(message, channel, role);
  });
}
/**
 * Cancel a nodewar event
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */


function cancelNodeWar(message, channel, role) {
  console.log("Cancelling nodewar...");
  console.log(role);
  DB.Connect(message.guild).table("nodewar").filter({
    isActive: true
  }).delete().run().then(function (result) {
    console.log((0, _stringify.default)(result, null, 2));
    message.reply("NodeWar successfully canceled.");
    setNodewarTopic(message, "UPS will prevail soon.");
    (0, _features.clearAttendingMembers)(message, channel, role);
  });
}
/**
 * Write a nodewar event to the filesystem.
 * @param  {[type]} message [description]
 * @param  {[type]} date    [description]
 * @return {[type]}         [description]
 */


function createNodeWar(message, date) {
  console.log("Trying to create a nodewar...");
  var endDate = date.add({
    hours: 10,
    minutes: 30
  });
  var fDate = date.format("dddd, MMMM Do YYYY");
  var nwObject = {
    isActive: true,
    victory: false,
    date: date.format(),
    createdAt: _momentTimezone.default.tz((0, _momentTimezone.default)(), timezone).format(),
    creatorId: message.member.id,
    attendingMembers: 0
  };
  DB.Connect(message.guild).table("nodewar").filter({
    isActive: true
  }).run().then(function (result) {
    if (result.length == 1) {
      updateCurrentNodeWar(nwObject, message);
      message.reply("Modified the current Nodewar.");
      setNodewarTopic(message, "Nodewar => ".concat(fDate, " !"));
    }

    if (result.length == 0) {
      insertNewNodeWar(nwObject, message);
      message.reply("New nodewar created !");
      setNodewarTopic(message, "Nodewar => ".concat(fDate, " !"));
    }

    if (result.length > 1) {
      message.reply("DB ERROR, need to be resynced.");
    }
  });
}
/**
 * Initiate the async sequence for answering to $nodewar
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */


function nodewarCheck(message) {
  console.log("Hello");
  DB.Connect(message.guild).table("nodewar").filter({
    isActive: true
  }).run().then(function (result) {
    console.log("fetchActiveNodewar result");
    respondNodewar(message, result);
  });
} //Update a node war


function updateCurrentNodeWar(nwObject, message) {
  DB.Connect(message.guild).table("nodewar").filter({
    isActive: true
  }).update({
    date: nwObject.date
  }).run().then(function (result) {
    console.log((0, _stringify.default)(result, null, 2));
  });
  console.log("Updated nodewar.");
} //Insert a node war


function insertNewNodeWar(nwObject, message) {
  DB.Connect(message.guild).table("nodewar").insert(nwObject).run().then(function (result) {
    console.log((0, _stringify.default)(result, null, 2));
  });
  console.log("Created nodewar");
} //The actual response sent by the bot.


function respondNodewar(message, result) {
  if (result.length == 1) {
    var fDate = (0, _momentTimezone.default)(result[0].date).format("dddd, MMMM Do YYYY");
    setNodewarTopic(message, "Nodewar => ".concat(fDate, " !"));
    message.reply("Nodewar scheduled for ".concat(fDate, "."));
  } else {
    message.reply("When would you like to create a nodewar?");
  }
} //Set the topic for the nw channel


function setNodewarTopic(_x, _x2) {
  return _setNodewarTopic.apply(this, arguments);
}

function _setNodewarTopic() {
  _setNodewarTopic = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(message, topic) {
    var conf, nodeWarChannel;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("Setting topic");
            _context.next = 3;
            return DB.Connect(message.guild).table("configuration").get(0).run();

          case 3:
            conf = _context.sent;
            nodeWarChannel = message.member.guild.channels.find("name", conf.nodeWarChannel);
            nodeWarChannel.setTopic(topic);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _setNodewarTopic.apply(this, arguments);
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spoilThisContent = spoilThisContent;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _gifgenerator = __webpack_require__(32);

var _messages = __webpack_require__(2);

var fs = __webpack_require__(8);
/**
 * Inspired by @TimboKZ https://github.com/TimboKZ/discord-spoiler-bot/
 */

/**
 * Class for a spoiler.
 * @param {DiscordMessage} message
 * @param {string} topic
 * @param {string} content
 */


var Spoiler = function Spoiler(message, topic, content) {
  (0, _classCallCheck2.default)(this, Spoiler);
  this.message = message;
  this.topic = topic;
  this.content = content;
};
/**
 * Handle the spoiler syntax and spoil the content.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */


function spoilThisContent(message, client) {
  if (message.content.match(/^.+\$spoiler.+$/)) {
    console.log("Spoiler");
    var parts = message.content.split("$spoiler");
    var spoiler = new Spoiler(message, parts[0], parts[1]);
    message.delete();
    message.channel.send("**".concat((0, _messages.getRandomDontSpoilMessage)(), "**")).then(function (m) {
      setTimeout(function () {
        m.delete();
      }, 3000);
    }); // message.channel.send("New content")

    printSpoiler(spoiler);
  }
}
/**
 * Print a Spoiler message.
 * @param  {Class} spoiler [Must be a spoiler class]
 */


function printSpoiler(spoiler) {
  var messageContent = "**".concat(spoiler.topic, "** spoiler");
  var maxLines = 30;
  var g = new _gifgenerator.GifGenerator();
  g.createSpoilerGif(spoiler, maxLines, function (filePath) {
    sendFile(spoiler.message, filePath, "spoiler.gif", messageContent, function () {
      console.log("Deleting The Gif");
      fs.unlink(filePath, function (err) {
        return err ? console.error("Could not remove GIF: ".concat(err)) : null;
      });
    });
  });
}
/**
 * Reply to a message with a file.
 * @param  {DiscordjsMessage}   message  [description]
 * @param  {String}   filePath [description]
 * @param  {String}   fileName [description]
 * @param  {String}   content  [description]
 * @param  {Function} done     Callback
 */


function sendFile(message, filePath, fileName, content, done) {
  var options = {
    files: [{
      attachment: filePath,
      name: fileName
    }]
  };
  message.reply(content, options).then(function () {
    return done();
  }).catch(function (error) {
    return console.log("Error sending file: ".concat(error));
  });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GifGenerator = void 0;

var _assign = _interopRequireDefault(__webpack_require__(33));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(13));

var _canvasPrebuilt = _interopRequireDefault(__webpack_require__(34));

var _gifencoder = _interopRequireDefault(__webpack_require__(35));

var _sanitizeFilename = _interopRequireDefault(__webpack_require__(36));

var _messages = __webpack_require__(2);

var path = __webpack_require__(16);

var fs = __webpack_require__(8);

var Font = _canvasPrebuilt.default.Font;
var GIF_PATH = "assets/gifs";
var FONT_PATH = "assets/fonts";
var SOURCE_SANS_PRO = Font ? new Font("SourceSansPro", path.join("assets/fonts", "SourceSansPro-Regular.ttf")) : null;
/**
 * With the courtesy of @TimboKZ https://github.com/TimboKZ/discord-spoiler-bot/blob/master/src/GifGenerator.js
 */

var GifGenerator =
/*#__PURE__*/
function () {
  function GifGenerator(gifConfig) {
    (0, _classCallCheck2.default)(this, GifGenerator);
    if (!gifConfig) gifConfig = {};

    if (!gifConfig.colours) {
      if (gifConfig.colors) {
        gifConfig.colours = gifConfig.colors;
        delete gifConfig.colors;
      } else {
        gifConfig.colours = {};
      }
    }
    /**
     * @type {{margin: number, width: number, lineHeight: number, placeholderText: string, fontSize: string}}
     */


    this.config = (0, _assign.default)({
      margin: 10,
      width: 400,
      lineHeight: 40,
      placeholderText: (0, _messages.getRandomDontSpoilMessage)(),
      fontSize: "13px"
    }, gifConfig);
    /**
     * @type {{background: string, stroke: string, text: string, placeholder: string}}
     */

    this.config.colours = (0, _assign.default)({
      background: "#3c3f44",
      stroke: "#b2ac94",
      text: "#c0ba9e",
      placeholder: "#8c8775"
    }, gifConfig.colours);
    this.config.lineWidth = this.config.width - this.config.margin * 2;
  }
  /**
   * @callback done
   * @param {string} filePath
   */

  /**
   * @param {Spoiler} spoiler
   * @param {number} maxLines
   * @param {done} done
   * @return {string}
   */


  (0, _createClass2.default)(GifGenerator, [{
    key: "createSpoilerGif",
    value: function createSpoilerGif(spoiler, maxLines, done) {
      var hash = "".concat((0, _sanitizeFilename.default)(spoiler.message.member.displayName), "-").concat(spoiler.message.id, "-").concat(new Date().getTime());
      var gifPath = path.join(GIF_PATH, "".concat(hash, ".gif"));
      this.createGif(spoiler, maxLines, gifPath, done);
      return gifPath;
    }
    /**
     * @param {Spoiler} spoiler
     * @param {number} maxLines
     * @param {string} filePath
     * @param {done} done
     */

  }, {
    key: "createGif",
    value: function createGif(spoiler, maxLines, filePath, done) {
      var lines = this.prepareLines(spoiler, maxLines);
      var height = (lines.length + 0.5) * this.config.lineHeight / 2;
      var context = this.createCanvasContext(height);
      var encoder = this.prepareEncoder(height, filePath, done);
      this.renderSpoilerMessage(context, encoder, height);
      this.renderLines(context, encoder, height, lines);
      encoder.finish();
    }
    /**
     * @param {Spoiler} spoiler
     * @param {number} maxLines
     * @return {string[]}
     */

  }, {
    key: "prepareLines",
    value: function prepareLines(spoiler, maxLines) {
      var context = this.createCanvasContext(15);
      return this.breakIntoLines(spoiler.content, context, maxLines);
    }
    /**
     * @param {string} text
     * @param {Context2d} context
     * @param {number} maxLines
     * @return {string[]}
     */

  }, {
    key: "breakIntoLines",
    value: function breakIntoLines(text, context, maxLines) {
      var lines = [];
      var linesBreak = text.split("\n");

      for (var j = 0; j < linesBreak.length; j++) {
        var line = "";
        var words = linesBreak[j].split(" ");

        for (var i = 0; i < words.length; i++) {
          if (line !== "") line += " ";
          var word = words[i];
          var max = Math.max(context.measureText(line).width, context.measureText(line + word).width);

          if (max > this.config.lineWidth) {
            lines.push(line);
            line = "";
          }

          line += word;
        }

        if (line !== "" || lines.length === 0) {
          lines.push(line);
        }
      }

      if (lines.length > maxLines) {
        lines = lines.slice(0, maxLines);
        lines[lines.length - 1] += "...";
      }

      return lines;
    }
    /**
     * @param {number} height
     * @param {string} filePath
     * @param {done} done
     * @return {GIFEncoder}
     */

  }, {
    key: "prepareEncoder",
    value: function prepareEncoder(height, filePath, done) {
      var encoder = new _gifencoder.default(this.config.width, height);
      var readStream = encoder.createReadStream();
      var writeStream = fs.createWriteStream(filePath);
      readStream.pipe(writeStream);
      writeStream.on("close", function () {
        return done(filePath);
      });
      encoder.start();
      encoder.setRepeat(-1);
      encoder.setDelay(500);
      encoder.setQuality(10);
      return encoder;
    }
    /**
     * @param {Context2d} context
     * @param {GIFEncoder} encoder
     * @param {number} height
     */

  }, {
    key: "renderSpoilerMessage",
    value: function renderSpoilerMessage(context, encoder, height) {
      this.clearContextBackground(context, height);
      this.renderTextToContext(context, this.config.lineHeight / 2, this.config.placeholderText, this.config.colours.placeholder);
      encoder.addFrame(context);
    }
    /**
     * @param {Context2d} context
     * @param {GIFEncoder} encoder
     * @param {number} height
     * @param {string[]} lines
     */

  }, {
    key: "renderLines",
    value: function renderLines(context, encoder, height, lines) {
      this.clearContextBackground(context, height);

      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var marginTop = this.config.lineHeight / 2 * (i + 1);
        this.renderTextToContext(context, marginTop, line, this.config.colours.text);
      }

      encoder.addFrame(context);
    }
    /**
     * @param {number} height
     * @return {Context2d}
     */

  }, {
    key: "createCanvasContext",
    value: function createCanvasContext(height) {
      var canvas = new _canvasPrebuilt.default(this.config.width, height);
      var context = canvas.getContext("2d");

      if (SOURCE_SANS_PRO !== null) {
        context.addFont(SOURCE_SANS_PRO);
      }

      var fontName = SOURCE_SANS_PRO !== null ? "aSourceSansPro" : '"Lucida Sans Unicode"';
      context.font = "".concat(this.config.fontSize, " ").concat(fontName);
      return context;
    }
    /**
     * @param {Context2d} context
     * @param {number} height
     */

  }, {
    key: "clearContextBackground",
    value: function clearContextBackground(context, height) {
      context.fillStyle = this.config.colours.background;
      context.strokeStyle = this.config.colours.stroke;
      context.rect(0, 0, this.config.width, height);
      context.fill();
      context.stroke();
    }
    /**
     *
     * @param {Context2d} context
     * @param {number} marginTop
     * @param {string} text
     * @param {string} colour
     */

  }, {
    key: "renderTextToContext",
    value: function renderTextToContext(context, marginTop, text, colour) {
      context.fillStyle = colour;
      context.fillText(text, this.config.margin, marginTop);
    }
  }]);
  return GifGenerator;
}();

exports.GifGenerator = GifGenerator;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/assign");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("canvas-prebuilt");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("gifencoder");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("sanitize-filename");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleEnhance = handleEnhance;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(9));

var _toArray2 = _interopRequireDefault(__webpack_require__(38));

var _entries = _interopRequireDefault(__webpack_require__(10));

var _keys = _interopRequireDefault(__webpack_require__(39));

var _jsYaml = _interopRequireDefault(__webpack_require__(40));

var _lodash = _interopRequireDefault(__webpack_require__(41));

var _messages = __webpack_require__(2);

var _helpers = __webpack_require__(42);

var fs = __webpack_require__(8);

var path = __webpack_require__(16);

/**
 * Handle what we do when we get the keyword related to ehnancing.
 * @param {Message} message Message Object from DiscordJS
 * @param {Client} client DiscordJS client.
 */
function handleEnhance(message, client) {
  var keyFs = "$fs";

  if (message.content.startsWith(keyFs)) {
    failstackManager(message, client);
  }
}
/**
 * Failstack logic.
 * @param {Message} message Message Object from DiscordJS
 * @param {Client} client DiscordJS client.
 */


function failstackManager(message, client) {
  var args = message.content.slice(1).trim().split(/ +/g);
  var command = args.shift().toLowerCase();
  var firstArg = args[0];
  var secondArg = args[1];
  var failstacks;
  var target;
  var names = [];
  var notHelping = true; //Parse the failstacks.yaml

  try {
    failstacks = _jsYaml.default.safeLoad(fs.readFileSync(path.join("bot/enhancing", "failstacks.yaml"), "utf8"));
    target = _jsYaml.default.safeLoad(fs.readFileSync(path.join("bot/enhancing", "target.yaml"), "utf8")); // console.log(data)
  } catch (e) {
    console.log(e);
  }

  target = target.target;
  var grades = (0, _keys.default)(target); //Get all the object names

  (0, _entries.default)(failstacks).forEach(function (_ref) {
    var _ref2 = (0, _toArray2.default)(_ref),
        key = _ref2[0],
        type = _ref2.slice(1);

    _lodash.default.flattenDeep(type).forEach(function (o) {
      return names.push(o.name);
    });
  });
  names = _lodash.default.flattenDeep(names);

  if (!firstArg || !secondArg) {
    return message.reply("Please use the command correctly. Refer to **$help**.");
  }

  if ((0, _helpers.isWordInList)(firstArg, grades) && (0, _helpers.isWordInList)(secondArg, names)) {
    //Iterate over failstacks file.
    (0, _entries.default)(failstacks).forEach(function (_ref3) {
      var _ref4 = (0, _toArray2.default)(_ref3),
          key = _ref4[0],
          obj = _ref4.slice(1);

      //Iterate over each flatten subdivision
      _lodash.default.flattenDeep(obj).forEach(function (iType) {
        if ((0, _helpers.isWordInList)(secondArg, iType.name)) {
          //Iterate over itemtypes properties.
          (0, _entries.default)(iType).forEach(function (_ref5) {
            var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
                k = _ref6[0],
                v = _ref6[1];

            if (v.current == target[firstArg]) {
              notHelping = false;
              message.reply("Use stacks ranging from ".concat(v.minStack, " to ").concat(v.maxStack, ". ").concat((0, _messages.getRandomGoodLuckMessage)()));
            }
          });
        }
      });
    });
    console.log("nothelping?");
    notHelping ? message.reply("You should definitely know how to make that ".concat(firstArg, " ").concat(secondArg, " yourself. I'm not helping you.")) : null;
  } else {
    message.reply("I don't know what a ".concat(firstArg, " ").concat(secondArg, " is, I'm sorry :("));
  }
}

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toArray");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/keys");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("js-yaml");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.superSplit = superSplit;
exports.superArraySplit = superArraySplit;
exports.regexSplit = regexSplit;
exports.isWordInList = isWordInList;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(43));

function superSplit(string, n) {
  return Array(Math.ceil(string.length / n)).fill().map(function (a, i) {
    return (0, _toConsumableArray2.default)(string).slice(i * n, i * n + n).join("");
  });
}

function superArraySplit(array, n) {
  var T = array.join("\n");
  return Array(Math.ceil(T.length / n)).fill().map(function (a, i) {
    return array.slice(i * n, i * n + n).join("");
  });
}

function regexSplit(string, n) {
  return string.match(new RegExp("[\\s\\S]{1,".concat(n, "}"), "g")) || [];
}

function isWordInList(word, list) {
  if (list.length > 0) {
    return list.some(function (w) {
      return w.toLowerCase() == word.toLowerCase();
    });
  }
}

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("discord.js");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = {"token":"NDAzNTk0MTE4MDU3NTU4MDE2.DVT73g.GoIuAHI5CQZJp55rqzFsPWEEJUU"}

/***/ })
/******/ ]);
//# sourceMappingURL=ups-chan.js.map