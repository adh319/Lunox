const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "skip",
    description: "Skip the current song",
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

        if (player.queue.isEmpty && !client.data.get("autoplay", player.guildId)) {
            embed.setDescription(`Queue is empty. Skip not possible.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        player.skip();

        embed.setDescription(`Skipped the current song.`);

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
