const { EmbedBuilder } = require("discord.js");

module.exports.run = async (client, player) => {
  const channel = client.channels.cache.get(player.textChannel);

  await player.destroy();

  const embed = new EmbedBuilder()
    .setDescription(`\`📛\` | Queue ended: \`Disconnected\``)
    .setColor(client.color);

  return channel.send({ embeds: [embed] });
};
