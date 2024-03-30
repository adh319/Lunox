const { EmbedBuilder } = require("discord.js");
const Guild = require("../../../settings/models/Guild.js");

module.exports.run = async (client, player) => {
    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) return;

    if (player.queue.length) return;

    if (player.message) await player.message.delete().catch((e) => {});

    // this will make the bot will not be showing below message when queue end if 247 activated
    const data = await Guild.findOne({ Id: player.guildId });
    const reconnect = data.reconnect;

    await player.stop();

    if (reconnect.status === true) return;
    //

    const embed = new EmbedBuilder()
        .setDescription(`\`👋\` | Queue is empty. Disable this by using \`247\` command.`)
        .setColor(client.color);

    return channel.send({ embeds: [embed] });
};
