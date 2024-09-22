const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "shuffle",
    description: "Shuffle the queue",
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

        if (player.queue.isEmpty) {
            embed.setDescription(`Queue is empty. Shuffle not possible.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (player.queue.length <= 1) {
            embed.setDescription(`Only one song in queue. Shuffle not possible.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        player.queue.shuffle();

        embed.setDescription(`Shuffled the queue.`);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
