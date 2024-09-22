const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "previous",
    description: "Play the previous song",
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

        if (!player.queue.previous) {
            embed.setDescription(`Previous song not found.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        player.previous();

        embed.setDescription(`Playing the previous song.`);

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
