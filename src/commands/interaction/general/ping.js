const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Get the bot's ping",
    category: "general",
    permissions: {
        bot: [],
        user: [],
    },
    settings: {
        voice: false,
        player: false,
        current: false,
    },
    devOnly: false,
    run: async (client, interaction, player) => {
        const embed = new EmbedBuilder().setColor(client.config.embedColor).setDescription(`🏓 Pong! \`${Math.round(client.ws.ping)}ms\`.`);

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
