const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "restart",
    aliases: ["reboot"],
    description: "Restart the bot process",
    category: "dev",
    permissions: {
        bot: [],
        user: [],
    },
    settings: {
        voice: false,
        player: false,
        current: false,
    },
    devOnly: true,
    run: async (client, message, player, args) => {
        const embed = new EmbedBuilder().setColor(client.config.embedColor);

        embed.setDescription("🔄 Restarting bot...");

        await message.reply({ embeds: [embed] });

        process.exit(0);
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
