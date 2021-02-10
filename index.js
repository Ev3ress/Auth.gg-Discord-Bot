const Discord = require("discord.js");
var mk = new Discord.Client();
const Settings = require("./Settings.json")

LoadShits();
mk.login(Settings.token);

mk.on("ready", ()=>{
Logo();
});


/////////////////////////////////////////////////////////////
async function Logo()
{
console.clear();
console.log(`
▓█████ ██▒   █▓ ██▀███  ▓█████   ██████ 
▓█   ▀▓██░   █▒▓██ ▒ ██▒▓█   ▀ ▒██    ▒ 
▒███   ▓██  █▒░▓██ ░▄█ ▒▒███   ░ ▓██▄   
▒▓█  ▄  ▒██ █░░▒██▀▀█▄  ▒▓█  ▄   ▒   ██▒
░▒████▒  ▒▀█░  ░██▓ ▒██▒░▒████▒▒██████▒▒
░░ ▒░ ░  ░ ▐░  ░ ▒▓ ░▒▓░░░ ▒░ ░▒ ▒▓▒ ▒ ░
 ░ ░  ░  ░ ░░    ░▒ ░ ▒░ ░ ░  ░░ ░▒  ░ ░
   ░       ░░    ░░   ░    ░   ░  ░  ░  
   ░  ░     ░     ░        ░  ░      ░  
`)
console.log(`                    BOT: ${mk.user.tag}`)
console.log(`                    Prefix: ${Settings.prefix}`)
console.log(`                    Servers: ${mk.guilds.cache.size}`)
console.log(`                    Made By: Ev3res#5555`)
}

/////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////
async function LoadShits()
{
    mk.commands = new Discord.Collection();
mk.aliases = new Discord.Collection();
mk.event = new Discord.Collection();
    const loadCommands = require("./functions/commands.js");
    const loadEvents = require("./functions/events.js");
    
    const load = async () => {
        await loadCommands.run(mk);
        await loadEvents.run(mk);
    }
    
    mk.functions = require("./functions/functions.js");
    
    load();
}
/////////////////////////////////////////////////////////////



