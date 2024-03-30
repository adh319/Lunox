const { EmbedBuilder } = require("discord.js");

module.exports.run = async (client, player, track) => {
    if (!player) return;

    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) return;

    console.log(`Error when loading song! Track error is in [${player.guildId}]`);

    if (player.message) await player.message.delete().catch((e) => {});

    if (player.queue.length > 0 || player.queue.size !== 0) {
        await player.skip();

        const embed = new EmbedBuilder().setDescription(`\`❌\` | Failed to load the track: \`Auto-Skip\``).setColor(client.color);

        return channel.send({ embeds: [embed] });
    } else {
        await player.stop();

        const embed = new EmbedBuilder().setDescription(`\`❌\` | Failed to load the track: \`Auto-Stop\``).setColor(client.color);

        return channel.send({ embeds: [embed] });
    }
};
