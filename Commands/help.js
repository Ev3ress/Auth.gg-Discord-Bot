const Discord = require("discord.js");
const Settings = require("../Settings.json")

module.exports.run = (bot, message, args) => {

    var ok = message.member.guild.roles.cache.find(lol => lol.id == Settings.supportrole)
    if(!ok) return message.reply(":x: | Setup Support Role");
    var perms = message.member.roles.cache.get(Settings.supportrole);
    if(!perms) return message.reply(":x: | You Don't Have Access To Use This Command");

var embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setThumbnail(Settings.thumbnail)
bot.commands.forEach(e => {
    embed.addField(Settings.prefix + e.help.name + " / " + Settings.prefix + e.help.aliases, e.help.desc)
});
return message.channel.send(embed)
    }  

    exports.help = {
        name: "help",
        aliases: ['cmd'],
        desc: "Commands List"
    }

