const ding = (interaction) => {
    if (interaction.commandName == "ding") {
        interaction.reply("dong").catch((e) => {
            console.log(e);
        });
    }
}


module.exports = ding;
