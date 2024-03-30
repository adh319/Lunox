const Guild = require("../../../settings/models/Guild.js");

module.exports.run = async (client, node) => {
    console.log(`[INFO] Node ${node.name} Ready!`);

    // This will auto reconnect when bot started or has been restarted
    const maindata = await Guild.find();
    const status = maindata.filter((x) => x.reconnect.status === true);

    console.log(`[INFO] Auto ReConnect found in ${status.length} servers!`);

    for (let data of maindata) {
        const index = maindata.indexOf(data);
        const reconnect = data.reconnect;

        setTimeout(async () => {
            const channels = client.channels.cache.get(reconnect.text);
            const voices = client.channels.cache.get(reconnect.voice);

            if (!channels || !voices || reconnect.status === false) return;

            await client.ruvyrias.createConnection({
                guildId: data.Id,
                voiceChannel: reconnect.voice,
                textChannel: reconnect.text,
                deaf: true,
            });
        }),
            index * 5000;
    }
    //
};
