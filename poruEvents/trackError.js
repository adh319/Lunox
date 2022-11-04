const { EmbedBuilder } = require('discord.js');

module.exports.run = async (client, player, track) => {
  const channel = client.channels.cache.get(player.textChannel);
  
  await player.stop();
  
  const embed = new EmbedBuilder()
    .setDescription(`\`❌\` | Failed to load the track: \`Auto-Skipped\``)
    .setColor(client.color);
    
  console.log(`Error when loading song! Track error is in [${player.guild}]`, "error");
  return channel.send({ embeds: [embed] });
};
