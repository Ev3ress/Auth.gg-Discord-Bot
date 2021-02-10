const Settings = require("../Settings.json")
const req = require("request");
module.exports.run = (bot, message, args)=>
{
    var ok = message.member.guild.roles.cache.find(lol => lol.id == Settings.supportrole)
    if(!ok) return message.reply(":x: | Setup Support Role");
    var perms = message.member.roles.cache.get(Settings.supportrole);
    if(!perms) return message.reply(":x: | You Don't Have Access To Use This Command");
    var username = args[0]
    if(!username) return message.reply(":x: | Mention Username")
    var password = args[1]
    if(!password) return message.reply(":x: | Mention Password")
    var email = args[2]
    if(!email) return message.reply(":x: | Mention Email")
    var license = args[3]
    if(!license) return message.reply(":x: | Mention License")

    var content = {
        "type": "register",
        "aid": Settings.aid,
        "apikey": Settings.apikey,
        "secret": Settings.secret,
        "username": username,
        "password": password,
        "license": license,
        "email": email,
        "hwid": "123"
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
case "invalid_license":
message.reply(`:x: | Invalid License!`)
break;
case "email_used":
message.reply(`:x: | That Email Is Already Taken!`)
break;
case "invalid_username":
message.reply(`:x: | Invalid Or Taken Username!`)
break;
case "success":
req(`https://developers.auth.gg/HWID/?type=reset&authorization=${Settings.authkey}&user=${username}`)
message.reply(`:white_check_mark: | Successfully Registered ${username}`)
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
    name: "register",
    aliases: ['createacc'],
    desc: "Creat An Account"
  }
