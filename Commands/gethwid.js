const Settings = require("../Settings.json")
const req = require("request");
const disc = require("discord.js");

module.exports.run = (bot, message, args)=>
{
    var ok = message.member.guild.roles.cache.find(lol => lol.id == Settings.supportrole)
    if(!ok) return message.reply(":x: | Setup Support Role");
    var perms = message.member.roles.cache.get(Settings.supportrole);
    if(!perms) return message.reply(":x: | You Don't Have Access To Use This Command");
    var username = args[0];
    if(!username) return message.reply(":x: | Mention Username");
    try{
    req({
        uri: `https://developers.auth.gg/HWID/?type=fetch&authorization=${Settings.authkey}&user=${username}`,
        method: "GET"
    },function(error, response, data)
    {
var lol = JSON.parse(data)["info"];
switch(lol)
{
case "No application found":
message.reply(`:x: | Invalid Auth Key!`)
break;
case "No user found":
message.reply(`:x: | Couldn't Find That User!`)
break;
case "Not set":
message.reply(`:x: | Couldn't Find That User HWID!`)
break;
default:
    var embed = new disc.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(Settings.thumbnail)
    .addField("Username", username)
    .addField("HWID", JSON.parse(data)["value"])
    message.channel.send(embed)
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
    name: "ghwid",
    aliases: ['gethwid'],
    desc: "Get Someones HWID"
  }
