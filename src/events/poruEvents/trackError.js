const { EmbedBuilder } = require("discord.js");

module.exports.run = async (client, player, track) => {
    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) return;

    console.log(`Error when loading song! Track error is in [${player.guildId}]`);

    await player.stop();

    const embed = new EmbedBuilder().setDescription(`\`❌\` | Failed to load the track: \`Auto-Stop\``).setColor(client.color);

    await channel.send({ embeds: [embed] });

    if (player.queue.length) return;

    return player.destroy();
};
