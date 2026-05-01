const { EmbedBuilder, MessageFlags } = require("discord.js");

module.exports = {
    name: "skipall",
    description: "Clear the queue and skip current song",
    category: "music",
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

        if (player.queue.isEmpty && !player.queue.current) {
            embed.setDescription(`❌ Queue is empty. Nothing to skip.`);
            return interaction.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
        }

        const queueSize = player.queue.size;

        player.queue.clear();
        player.skip();

        embed.setDescription(`🗑️ Cleared **${queueSize}** song(s) from queue and skipped current track.`);
        return interaction.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
    },
};

/**
 * Project: Lunox
 * Author: downyJR
 * Copyright © 2024 downyJR. Licensed under MIT.
 */