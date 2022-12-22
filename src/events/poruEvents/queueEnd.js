const { EmbedBuilder } = require("discord.js");

module.exports.run = async (client, player) => {
  const channel = client.channels.cache.get(player.textChannel);
  if (!channel) return;

  if (player.queue.length) return;

  if (player.message) await player.message.delete();

  await player.destroy();

  const embed = new EmbedBuilder().setDescription(`\`📛\` | Queue empty: \`Disconnected\``).setColor(client.color);

  return channel.send({ embeds: [embed] }).then((msg) => {
    setTimeout(() => {
      msg.delete();
    }, 12000);
  });
};
