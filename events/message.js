const { settings } = require("cluster");
var Settings = require("../Settings.json");
module.exports = async (bot, message) => {

    var prefix = Settings.prefix;
    const args = message.content.split(/ +/g);
    const command = args.shift().slice(prefix.length).toLowerCase();
    const cmd = bot.commands.get(command) || bot.aliases.get(command);

    if(!message.content.toLowerCase().startsWith(prefix) || !message.guild || message.author.bot || !cmd) return;    

    cmd.run(bot, message, args);

} 