const Settings = require("../Settings.json")
const req = require("request");
const discord = require("discord.js");
module.exports.run = (bot, message, args)=>
{
    var ok = message.member.guild.roles.cache.find(lol => lol.id == Settings.supportrole)
    if(!ok) return message.reply(":x: | Setup Support Role");
    var perms = message.member.roles.cache.get(Settings.supportrole);
    if(!perms) return message.reply(":x: | You Don't Have Access To Use This Command");
    var username = args[0];
    if(!username) return message.reply(":x: | Mention Username");
    var content = {
        "type": "forgotpw",
        "aid": Settings.aid,
        "apikey": Settings.authkey,
        "secret": Settings.secret,
        "username": username
    }
    try{
    req({
        uri: `https://api.auth.gg/v1/`,
        form: content,
        method: "POST"
    },function(error, response, data)
    {
var lol = JSON.parse(data)["result"];
switch(lol)
{
case "failed":
message.reply(`:x: | Failed!`)
break;
case "invalid_user":
message.reply(`:x: | Couldn't Find That User!`)
break;
case "success":
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
    name: "repass",
    aliases: ['repassword'],
    desc: "Sends An Email To Reset Password"
  }
