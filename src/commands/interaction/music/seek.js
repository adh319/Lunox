const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "seek",
    description: "Seek the current song",
    category: "music",
    options: [
        {
            name: "time",
            description: "Provide time in seconds",
            type: 4,
            min_value: 0,
            required: true,
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
        const time = interaction.options.getInteger("time");

        if (!player.queue.current.isSeekable) {
            embed.setDescription(`The current song is not seekable.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (time * 1000 > player.queue.current.duration) {
            embed.setDescription(`Time is greater than the duration of the song.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        player.seek(time * 1000);

        embed.setDescription(`Seeked to: \`${time}s\``);

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
