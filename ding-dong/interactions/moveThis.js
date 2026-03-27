const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ChannelType } = require("discord.js");
const sendMessage = require("./components/sendMessage");

const moveThis = async (interaction, client) => {

    if (interaction.commandName === "Move_this") {

        const targetMessage = interaction.targetMessage;

        const modal = new ModalBuilder()
            .setCustomId(`move-modal-this-${targetMessage.channel.id}-${targetMessage.id}`)
            .setTitle("Move this message");

        const textInput1 = new TextInputBuilder()
            .setCustomId("target-channel")
            .setLabel("Target Channel/Forum Channel ID")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("1398962998015723265")
            .setRequired(true);

        const textInput2 = new TextInputBuilder()
            .setCustomId("title")
            .setLabel("Thread/Post ID (only for forum channels)")
            .setPlaceholder("1463981562256167105")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const actionRow1 = new ActionRowBuilder().addComponents(textInput1);

        const actionRow2 = new ActionRowBuilder().addComponents(textInput2);

        modal.addComponents(actionRow1, actionRow2);

        await interaction.showModal(modal).catch((e) => {
            console.log(e);
        });

        return;

    }

    if (interaction.isModalSubmit() && interaction.customId.startsWith("move-modal-this-")) {
        await interaction.deferReply({ ephemeral: true });

        try {

            const [, , , sourceChannelId, sourceMessageId] = interaction.customId.split("-");

            const sourceChannel = await client.channels.fetch(sourceChannelId);
            const targetMessage = await sourceChannel.messages.fetch(sourceMessageId);

            const targetChannelId = interaction.fields.getTextInputValue("target-channel");
            let threadId = interaction.fields.getTextInputValue("title");
            let thread;

            const destChannel = await client.channels.fetch(targetChannelId);

            if (!sourceChannel || !destChannel) {
                await interaction.editReply("Invalid channel IDs");
                return;
            }

            if (destChannel.type == ChannelType.GuildForum) {
                if (!threadId) {
                    await interaction.editReply("❌ Title is required for forum channels!");
                    return;
                }
            } else if (destChannel.isTextBased()) {
                if (threadId) {
                    const thread = await destChannel.threads.fetch(threadId);
                    if (!thread || !thread.isThread()) {
                        await interaction.editReply("❌ Thread not found!");
                        return;
                    }
                } else {
                    threadId = null;
                }
            } else {
                await interaction.editReply("❌ Target must be a text channel, thread, or forum channel!");
                return;
            }

            if (threadId) {
                thread = await destChannel.threads.fetch(threadId);
                if (!thread) {
                    await interaction.editReply("❌ Thread not found!");
                    return;
                }
            }

            let webhook = (await destChannel.fetchWebhooks()).find(w => w.name === "Ding Dong Mover" && w.token);
            if (!webhook) {
                webhook = await destChannel.createWebhook({
                    name: "Ding Dong Mover"
                });
            }

            const messageToMove = [targetMessage];
            let beforeId = targetMessage.id;
            let pages = 0;

            if (thread) {
                await interaction.editReply(`I'm going to move messages from ${sourceChannel.name} to ${destChannel.name} in thread ${thread.name}`);
            } else {
                await interaction.editReply(`I'm going to move messages from ${sourceChannel.name} to ${destChannel.name}`);
            }

            interaction.editReply(`Starting Message: ${messageToMove[0].id} | Ending Message: ${messageToMove[messageToMove.length - 1].id} | Total Messages: ${messageToMove.length}`)

            sendMessage(interaction, client, messageToMove, threadId, webhook);

            if (thread) {
                interaction.editReply(`moved ${messageToMove.length} messages from ${sourceChannel.name} to ${destChannel.name} in thread ${thread.name}`)
            } else {
                interaction.editReply(`moved ${messageToMove.length} messages from ${sourceChannel.name} to ${destChannel.name}`)
            }


        } catch (error) {
            console.log(error);
            await interaction.editReply("An error occurred while moving messages" + error.message);
        }
    }

}

module.exports = moveThis;

