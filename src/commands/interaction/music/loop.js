const { EmbedBuilder, MessageFlags } = require("discord.js");

module.exports = {
    name: "loop",
    description: "Toggle loop mode (off/track/queue)",
    category: "music",
    options: [
        {
            name: "mode",
            description: "Loop mode",
            type: 3,
            required: false,
            choices: [
                { name: "Off", value: "off" },
                { name: "Track", value: "track" },
                { name: "Queue", value: "queue" },
            ],
        },
    ],
    permissions: {
        bot: [],
        user: [],
    },
    settings: {
        voice: true,
        player: true,
        current: true,
    },
    devOnly: false,
    run: async (client, interaction, player) => {
        const embed = new EmbedBuilder().setColor(client.config.embedColor);
        const modeArg = interaction.options.getString("mode");

        const modeMap = { off: "off", track: "track", queue: "queue" };
        const emojis = { off: "➖", track: "🔂", queue: "🔁" };
        const descriptions = {
            off: "Loop has been **disabled**.",
            track: "Loop mode set to **Track** - will repeat current song.",
            queue: "Loop mode set to **Queue** - will repeat entire queue.",
        };

        let newMode;
        if (modeArg) {
            newMode = modeMap[modeArg];
        } else {
            const current = player.queue.repeatMode;
            const cycle = ["off", "track", "queue"];
            const idx = cycle.indexOf(current);
            newMode = cycle[(idx + 1) % cycle.length];
        }

        player.queue.setRepeatMode(newMode);

        embed.setDescription(`${emojis[newMode]} ${descriptions[newMode]}`);

        return interaction.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
    },
};

/**
 * Project: Lunox
 * Author: downyJR
 * Copyright © 2024 downyJR. Licensed under MIT.
 */