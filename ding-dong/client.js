require("dotenv").config();

const commands = require("./commandOptions");
const {
    Client, GatewayIntentBits, Partials, Events, ActivityType,  // existing ones
    ContextMenuCommandBuilder,  // ← NEW
    ApplicationCommandType,     // ← NEW
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    ChannelType
} = require("discord.js");
const { discloud } = require("discloud");
const ding = require("./interactions/testInteraction");
const setPresence = require("./interactions/setPresence");
const testMessage = require("./messages/testMessage");
const pokemonSpawn = require("./messages/pokemonSpawn");
const moveBelow = require("./interactions/moveBelow");
const moveAbove = require("./interactions/moveAbove");
const moveThis = require("./interactions/moveThis");

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
    rest: {
        timeout: 120000
    }
});


// --------------- events ---------------

client.once(Events.ClientReady, async (c) => {
    c.user.setActivity("Playing with Ding Dong Balls", { type: ActivityType.Playing });

    const channel = await c.channels.fetch(process.env.BOT_TEST_CHANNEL);

    const guild = await c.guilds.fetch(process.env.BASEMENT_ID);

    const version = "1.1.0(t)";

    await guild.commands.set(commands).catch((e) => {
        console.log(e);
    });

    if (channel) {
        channel.send("Ding Dong is online! v: " + version + " " + new Date().toLocaleString());

        if (guild) {
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

    if (!interaction.isCommand() && !interaction.isContextMenuCommand() && !interaction.isModalSubmit() && !interaction.isButton() && !interaction.isAnySelectMenu()) return;

    setPresence(interaction, client);

    ding(interaction);

    moveBelow(interaction, client);

    moveAbove(interaction, client);

    moveThis(interaction, client);

});


// --------------- message ---------------

client.on(Events.MessageCreate, async (message) => {

    testMessage(message);

    pokemonSpawn(message);

});
