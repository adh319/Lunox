module.exports = async (client, player) => {
    if (!player) return;

    const guild = await client.guilds.cache.get(player.guildId);
    const guildData = client.data.get(`guildData_${guild.id}`);

    if (guildData.reconnect.status) {
        console.debug(`[DEBUG] Player reconnected to [${guild.name}] (${guild.id})`);
    } else {
        console.debug(`[DEBUG] Player created in [${guild.name}] (${guild.id})`);
    }
};

/**
 * Project: Lunox
 * Author: adh319`
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
