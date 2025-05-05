module.exports = async (client, node) => {
    console.log(`[INFO] Node ${node.options.name} ready`);

    const guildDatas = await client.guildData.find();
    const reconnects = guildDatas.filter((x) => x.reconnect.status);

    console.log(`[INFO] Auto reconnect found in ${reconnects.length} servers`);

    reconnects.forEach((guildData, index) =>
        setTimeout(async () => {
            const guild = await client.guilds.cache.get(guildData.id);
            const text = await client.channels.cache.get(guildData.reconnect.text);
            const voice = await client.channels.cache.get(guildData.reconnect.voice);

            if (!guildData.reconnect.status || !text || !voice) return;

            await client.rainlink.create({
                guildId: guild.id,
                voiceId: voice.id,
                textId: text.id,
                shardId: guild.shardId,
                volume: client.config.defaultVolume,
                deaf: true,
            });
        }, index * 5000),
    );
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
