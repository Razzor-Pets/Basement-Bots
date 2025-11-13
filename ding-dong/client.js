require("dotenv").config();

const commands = require("./commandOptions");
const { Client, GatewayIntentBits, Partials, Events, ActivityType } = require("discord.js"); 
const { discloud } = require("discloud");

console.log(process.env.DING_DONG_TOKEN);


// --------------- client ---------------

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Message, Partials.Channel],
});


// --------------- events ---------------

client.once(Events.ClientReady, async (c) => {;
    c.user.setActivity("Playing with Ding Dong Balls", { type: ActivityType.Playing});
    
    const channel = await c.channels.fetch(process.env.BOT_TEST_CHANNEL);

    const guild = await c.guilds.fetch(process.env.BASEMENT_ID);

    const version = "1.0.0";

    await guild.commands.set(commands).catch((e) => {
        console.log(e);
    });
    
    if(channel) {
        channel.send("Ding Dong is online! v: " + version);

        if(guild){
            channel.send("Guild found");
        }

    } else {
        console.log("Channel not found" + process.env.BOT_TEST_CHANNEL);
    }
});


// --------------- login ---------------


async function login() {
    try {
        await discloud.login(process.env.DING_DONG_TOKEN);
        console.log("Logged in as " + client.user.tag + "!");
    } catch (e) {
        console.log("Discloud login failed: " + e);
    }
}

login();

client.login(process.env.DING_DONG_TOKEN).then(() => {
    console.log("Logged in as " + client.user.tag + "!");
}).catch((e) => {
    console.log(e);
});


// --------------- interaction ---------------

client.on("interactionCreate", async (interaction) => {

    if(!interaction.isCommand()) return;

    if(interaction.commandName == "setpresence") {
            if(interaction.options.getString("presence") == null) {
                interaction.reply("Please provide a presence").catch((e) => {
                    console.log(e);
                });
                return;
        } else {
            client.user.setActivity(interaction.options.getString("presence"), { type: ActivityType.Playing});
            interaction.reply("Presence set to " + interaction.options.getString("presence")).catch((e) => {
                console.log(e);
            });
        }

    }

    if(interaction.commandName == "ding") {
        interaction.reply("dong").catch((e) => {
            console.log(e);
        });
    }
});


// --------------- message ---------------

client.on(Events.MessageCreate, async (message) => {
    console.log(message.content);

    if(message.content == "!ding") {
        message.reply("dong").catch((e) => {
            console.log(e);
        });
    }

    if(message.embeds.length > 0) {
        if(message.embeds[0].title == "A wild pokémon has appeared!" && message.channel.id == process.env.POKEMON_SPAWN_CHANNEL) {
            const reply = await message.reply( process.env.POKEMON_PING_ROLE + " Quick! A wild pokemon has appeared! Did you catch it?").catch((e) => {
                console.log(e);
            });
            reply.react("✅").catch((e) => {
                console.log(e);
            });
            reply.react("❌").catch((e) => {
                console.log(e);
            });
        }
    }
});
