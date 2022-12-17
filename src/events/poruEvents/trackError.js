const { EmbedBuilder } = require("discord.js");

module.exports.run = async (client, player, track) => {
  const channel = client.channels.cache.get(player.textChannel);

  await player.destroy();

  const embed = new EmbedBuilder().setDescription(`\`❌\` | Failed to load the track: \`Auto-Stop\``).setColor(client.color);

  console.log(`Error when loading song! Track error is in [${player.guildId}]`, "error");
  return channel.send({ embeds: [embed] }).then((msg) => {
    setTimeout(() => {
      msg.delete();
    }, 12000);
  });
};
