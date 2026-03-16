const { ActivityType } = require("discord.js");

const setPresence = (interaction, client) => {
    if (interaction.commandName == "set_presence") {
        if (interaction.options.getString("presence") == null) {
            interaction.reply("Please provide a presence").catch((e) => {
                console.log(e);
            });
            return;
        } else {
            client.user.setActivity(interaction.options.getString("presence"), { type: ActivityType.Playing });
            interaction.reply("Presence set to " + interaction.options.getString("presence")).catch((e) => {
                console.log(e);
            });
            return;
        }
    }
}

module.exports = setPresence;