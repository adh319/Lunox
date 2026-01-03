const { EmbedBuilder } = require("discord.js");
const Logger = require("../../../utils/logger");

module.exports = async (client, player) => {
    if (!player) return;

    const guild = await client.guilds.cache.get(player.guildId);

    Logger.error(`Song got stuck from ${guild.name} (${guild.id})`);

    if (player.message) player.message.delete().catch((e) => {});

    const channel = await client.channels.cache.get(player.textId);
    const embed = new EmbedBuilder().setColor(client.data.get(`color_${player.guildId}`));

    if (!player.queue.isEmpty) {
        embed.setDescription(`Song got stuck. Skipping to the next song...`);

        if (channel) await channel.send({ embeds: [embed] });
    } else {
        embed.setDescription(`Song got stuck and the queue is empty. Stopping the player...`);

        if (channel) await channel.send({ embeds: [embed] });
    }

    return player.skip();
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
