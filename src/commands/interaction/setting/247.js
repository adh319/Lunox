const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "247",
    description: "Toggle 247 mode",
    category: "setting",
    permissions: {
        bot: [],
        user: ["ManageGuild"],
    },
    settings: {
        voice: true,
        player: true,
        current: false,
    },
    devOnly: false,
    run: async (client, interaction, player) => {
        await interaction.deferReply({ ephemeral: true });

        const guildData = client.data.get(`guildData_${interaction.guildId}`);

        guildData.reconnect.status = !guildData.reconnect.status;
        guildData.reconnect.text = player.textId || interaction.channelId;
        guildData.reconnect.voice = player.voiceId || interaction.member.voice.channelId;

        const embed = new EmbedBuilder()
            .setColor(client.config.embedColor)
            .setDescription(guildData.reconnect.status ? "247 mode is now `enabled`." : "247 mode is now `disabled`.");

        return interaction.editReply({ embeds: [embed] });
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
