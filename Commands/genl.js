const Settings = require("../Settings.json")
const req = require("request");
const discord = require("discord.js");
module.exports.run = (bot, message, args)=>
{
    var ok = message.member.guild.roles.cache.find(lol => lol.id == Settings.supportrole)
    if(!ok) return message.reply(":x: | Setup Support Role");
    var perms = message.member.roles.cache.get(Settings.supportrole);
    if(!perms) return message.reply(":x: | You Don't Have Access To Use This Command");
    var days = args[0];
    if(!days) return message.reply(":x: | Mention Days");
    if(isNaN(parseInt(days))) return message.reply(":x: | Mention Valid Days");
    if(parseInt(days) > 9994) days = 9994;
    var level = args[1];
    if(!level) return message.reply(":x: | Mention Level");
    if(isNaN(parseInt(level))) return message.reply(":x: | Mention Valid Level");
    try{
    req({
        uri: `https://developers.auth.gg/LICENSES/?type=generate&days=${days}&amount=1&level=${level}&authorization=${Settings.authkey}`,
        method: "GET"
    },function(error, response, data)
    {
var lol = JSON.parse(data)["info"];
switch(lol)
{
case "No application found":
message.reply(`:x: | Invalid Auth Key!`)
break;
case "Days maximum reached; Maximum: 9999!":
message.reply(`:x: | Maximum 9994 Days`)
break;
case "Your data must be numeric!":
message.reply(`:x: | Invalid Data!`)
break;
default:
    var embed = new discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(Settings.thumbnail)
    .addField("License", JSON.parse(data)[0])
    .addField("Days", days)
    .addField("Level", level)
    message.channel.send(embed);
break;
}
});
}
catch(e)
{
return message.reply(`:x: | ${e}`)
}
};

exports.help = {
    name: "genl",
    aliases: ['genlicense'],
    desc: "Genearte License"
  }
