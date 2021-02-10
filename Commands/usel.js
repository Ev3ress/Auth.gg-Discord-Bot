const Settings = require("../Settings.json")
const req = require("request");
module.exports.run = (bot, message, args)=>
{
    var ok = message.member.guild.roles.cache.find(lol => lol.id == Settings.supportrole)
    if(!ok) return message.reply(":x: | Setup Support Role");
    var perms = message.member.roles.cache.get(Settings.supportrole);
    if(!perms) return message.reply(":x: | You Don't Have Access To Use This Command");
    var license = args[0];
    if(!license) return message.reply(":x: | Mention License");
    try{
    req({
        uri: `https://developers.auth.gg/LICENSES/?type=use&license=${license}&authorization=${Settings.authkey}`,
        method: "GET"
    },function(error, response, data)
    {
var lol = JSON.parse(data)["info"];
switch(lol)
{
case "No application found":
message.reply(`:x: | Invalid Auth Key!`)
break;
case "No license found":
message.reply(`:x: | Couldn't Find That License!`)
break;
case "License has been updated":
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
    name: "usel",
    aliases: ['uselicense'],
    desc: "Use A License"
  }
