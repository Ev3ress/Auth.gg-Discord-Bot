const Settings = require("../Settings.json")
const req = require("request");
module.exports.run = (bot, message, args)=>
{
    var ok = message.member.guild.roles.cache.find(lol => lol.id == Settings.supportrole)
    if(!ok) return message.reply(":x: | Setup Support Role");
    var perms = message.member.roles.cache.get(Settings.supportrole);
    if(!perms) return message.reply(":x: | You Don't Have Access To Use This Command");
    try{
    req({
        uri: `https://developers.auth.gg/USERS/?type=count&authorization=${Settings.authkey}`,
        method: "GET"
    },function(error, response, data)
    {
var lol = JSON.parse(data)["info"];
switch(lol)
{
case "No application found":
message.reply(`:x: | Invalid Auth Key!`)
break;
default:
if(JSON.parse(data)["value"] == "0") message.reply(`:x: | No Users`)
else message.reply(`:white_check_mark: | ${JSON.parse(data)["value"]} Users`)
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
    name: "countu",
    aliases: ['countusers'],
    desc: "Count Users"
  }
