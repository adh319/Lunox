const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "previous",
  description: "Return to the previous song.",
  category: "Music",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);

    if (!player.previousTrack) {
      const embed = new EmbedBuilder()
        .setDescription(`\`❌\` | Previous song was: \`Not found\``)
        .setColor(client.color);

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
    await player.queue.unshift(player.previousTrack);
    await player.stop();

    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setDescription(`\`⏮️\` | Song has been: \`Previous\``);

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
