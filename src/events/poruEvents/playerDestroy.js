const Reconnect = require("../../settings/models/247.js");

module.exports.run = async (client, player) => {
    const data = await Reconnect.findOne({ guild: player.guildId });

    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) return;

    // If 247 activated, this will auto connect voice when bot disconnected/destoryed
    if (data && Date.now() >= data.time) await data.delete(); // Enable this only When 247 command settings premium is set to true.
    if (player.state !== "DESTROYING" && data) {
        await client.poru.createConnection({
            guildId: data.guild,
            voiceChannel: data.voice,
            textChannel: data.text,
            deaf: true,
        });
    }
    //

    console.log(`[DEBUG] Player Destroyed from (${player.guildId})`);
};
