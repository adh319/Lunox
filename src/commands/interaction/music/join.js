const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "join",
    description: "Join the voice channel",
    category: "music",
    permissions: {
        bot: [],
        user: [],
    },
    settings: {
        voice: true,
        player: false,
        current: false,
    },
    devOnly: false,
    run: async (client, interaction, player) => {
        const embed = new EmbedBuilder().setColor(client.config.embedColor);

        if (player) {
            embed.setDescription(`Already joined a voice channel.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            player = await client.rainlink.create({
                guildId: interaction.guildId,
                textId: interaction.channelId,
                voiceId: interaction.member.voice.channelId,
                shardId: interaction.guild.shardId,
                deaf: true,
            });

            embed.setDescription(`Joined ${interaction.member.voice.channel}.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
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
