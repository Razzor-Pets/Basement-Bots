const pokemonSpawn = async (message) => {
    if (message.embeds.length > 0) {
        if (message.embeds[0].title.includes("A wild pokémon has appeared!") && message.channel.id == process.env.POKEMON_SPAWN_CHANNEL) {
            const reply = await message.reply(process.env.POKEMON_PING_ROLE + " Quick! A wild pokemon has appeared! Did you catch it?").catch((e) => {
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
}

module.exports = pokemonSpawn;