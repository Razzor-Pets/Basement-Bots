const sendMessage = async (interaction, client, messageToMove, threadId, webhook) => {
    for (let i = 0; i < messageToMove.length; i++) {

        const msg = messageToMove[i];

        const hasContent = msg.content && msg.content.trim().length > 0;
        const hasEmbeds = msg.embeds && msg.embeds.length > 0;
        const hasAttachments = msg.attachments && msg.attachments.size > 0;

        if (!hasContent && !hasEmbeds && !hasAttachments) {
            console.log(`${msg.id} : message is empty [SKIPPED]`);
            continue;
        }

        if (i % 5 === 0 || i === messageToMove.length - 1) {
            await interaction.editReply(`Moving message ${i + 1} out of ${messageToMove.length}`)
        }

        const files = msg.attachments.size > 0
            ? msg.attachments.map(att => ({ attachment: att.url, name: att.name }))
            : [];

        const validEmbeds = msg.embeds.filter(embed => embed.data.type === 'rich');

        const embedToSend = validEmbeds.length > 0 ? validEmbeds : undefined;

        console.log(msg.id + " : " + msg.content);

        try {
            const sentMsg = await webhook.send({
                content: msg.content || undefined,
                username: msg.member?.displayName || msg.author.globalName || msg.author.username,
                avatarURL: msg.author.displayAvatarURL({ size: 1024, format: 'png' }),
                embeds: embedToSend,
                files: files,
                threadId: threadId || undefined,
            })

            if (sentMsg.id === msg.id) {
                console.log("Message " + msg.id + " was not moved");
            }

        } catch (error) {
            console.log(error);
            await interaction.editReply("An error occurred while moving messages" + error.message);
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 1500));
    }
}

module.exports = sendMessage;