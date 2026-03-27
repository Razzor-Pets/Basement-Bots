const { ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

const commands = [];

commands.push(new SlashCommandBuilder()
    .setName('set_presence')                    // lowercase, no spaces
    .setDescription('Set the bot\'s presence')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
        option
            .setName('presence')
            .setDescription('The presence text to show')
            .setRequired(true)
    ),
);

commands.push(new SlashCommandBuilder()
    .setName('ding')
    .setDescription('Ding Dong Balls'),
);

commands.push(
    new ContextMenuCommandBuilder()
        .setName("Move_everything_below_this")
        .setType(ApplicationCommandType.Message)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
)

commands.push(
    new ContextMenuCommandBuilder()
        .setName("Move_this")
        .setType(ApplicationCommandType.Message)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
)

commands.push(
    new ContextMenuCommandBuilder()
        .setName("Move_everything_above_this")
        .setType(ApplicationCommandType.Message)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
)

module.exports = commands;