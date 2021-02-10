const Settings = require("../Settings.json")
const req = require("request");
const s = require("discord.js");
module.exports.run = (bot, message, args)=>
{
    var ok = message.member.guild.roles.cache.find(lol => lol.id == Settings.supportrole)
    if(!ok) return message.reply(":x: | Setup Support Role");
    var perms = message.member.roles.cache.get(Settings.supportrole);
    if(!perms) return message.reply(":x: | You Don't Have Access To Use This Command");
    var username = args[0];
    if(!username) return message.reply(":x: | Mention Username");
    var hwid = args[1];
    if(!hwid) return message.reply(":x: | Mention HWID");
    try{
    req({
        uri: `https://developers.auth.gg/HWID/?type=set&authorization=${Settings.authkey}&user=${username}&hwid=${hwid}`,
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
case "HWID value exceeds character limit":
message.reply(`:x: | Invalid HWID!`)
break;
case "HWID has been succesfully set":
message.reply(`:white_check_mark: | Done!`)
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
    name: "shwid",
    aliases: ['sethwid'],
    desc: "Set Someones HWID"
  }
