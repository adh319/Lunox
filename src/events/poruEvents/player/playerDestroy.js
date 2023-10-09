const Guild = require("../../../settings/models/Guild.js");

module.exports.run = async (client, player) => {
    console.log(`[DEBUG] Player Destroyed from (${player.guildId})`);

    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) return;

    if (player.message) await player.message.delete().catch((e) => {});

    // If 247 activated, this will auto connect voice when bot disconnected/destoryed
    const data = await Guild.findOne({ Id: player.guildId });
    const reconnect = data.reconnect;

    if (data && reconnect.status === true) {
        await client.poru.createConnection({
            guildId: data.Id,
            voiceChannel: reconnect.voice,
            textChannel: reconnect.text,
            deaf: true,
        });
    }
};
