var Discord = require('discord.io');
var logger = require('winston');
//var auth = require('./auth.json');
var fs = require('fs');
var readline = require('readline');
var nthline = require('nthline');
var rand = 93 /*This needs to be number of lines in the txt file PLUS ONE*/


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.BOT_TOKEN,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
	var Anchorheed = "361529408219119628";
    if (message.substring(0, 1) == '?') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
			break;
			/*case 'channel':
                bot.sendMessage({
                    to: Anchorheed,
                    message: channelID
                });
			break;*/
			case 'event':
				var line = Math.floor(Math.random() * rand);
				var inputFile = "\events.txt";
				nthline(line, inputFile).then(out => bot.sendMessage({to: Anchorheed, message: out}));
            break;
            
         }
     }
});
