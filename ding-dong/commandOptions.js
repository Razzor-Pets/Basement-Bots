const commands = [
    {
        name: "setpresence",
        description: "Set the bot's presence",
        options: [
            {
                name: "presence",
                description: "The presence to set",
                type: 3,
                required: true,
            }
        ]
    },
    {
        name: "ding",
        description: "Ding Dong Balls"
    }
];

module.exports = commands;