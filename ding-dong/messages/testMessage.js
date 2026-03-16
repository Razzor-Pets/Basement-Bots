const ding = (message) => {
    if (message.content == "!ding") {
        message.reply("dong").catch((e) => {
            console.log(e);
        });
    }
}

module.exports = ding;