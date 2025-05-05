const { EmbedBuilder, MessageFlags } = require("discord.js");

module.exports = {
    name: "remove",
    description: "Remove a song from the queue",
    category: "music",
    options: [
        {
            name: "position",
            description: "Provide song position",
            type: 4,
            min_value: 1,
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

        if (player.queue.isEmpty) {
            embed.setDescription(`The queue is empty.`);

            return interaction.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
        }

        const position = interaction.options.getInteger("position");

        if (position > player.queue.size) {
            embed.setDescription(`Position is greater than the total songs in the queue.`);

            return interaction.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
        }

        player.queue.remove(position - 1);

        embed.setDescription(`Removed song position: \`${position}\``);

        return interaction.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
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
