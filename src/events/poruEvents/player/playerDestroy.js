const Reconnect = require("../../../settings/models/247.js");

module.exports.run = async (client, player) => {
    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) return;

    // If 247 activated, this will auto connect voice when bot disconnected/destoryed
    const data = await Reconnect.findOne({ guild: player.guildId });

    if (data) {
        if (player.state !== "DESTROYING") {
            await client.poru.createConnection({
                guildId: data.guild,
                voiceChannel: data.voice,
                textChannel: data.text,
                deaf: true,
            });
        }
    }
    //

    console.log(`[DEBUG] Player Destroyed from (${player.guildId})`);
};
