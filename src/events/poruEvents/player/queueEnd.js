const { EmbedBuilder } = require("discord.js");
const Reconnect = require("../../../settings/models/247.js");

module.exports.run = async (client, player) => {
    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) return;

    if (player.queue.length) return;

    if (player.message) await player.message.delete();

    // this will make the bot will not be disconneted/destroyed when queue end if 247 activated
    const data = await Reconnect.findOne({ guild: player.guildId });

    if (data && Date.now() >= data.time) {
        await data.delete();
    } // Disable this "if" when 247 command settings premium is set to "false".

    if (data) return;
    //

    await player.destroy();

    const embed = new EmbedBuilder()
        .setDescription(`\`👋\` | Disconnected...!!! Due to queue was empty. This can be disable by using \`247\` command.`)
        .setColor(client.color);

    return channel.send({ embeds: [embed] });
};
