const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "resume",
  description: "Resume current paused song.",
  category: "Music",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);

    if (!player.isPaused) {
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`❌\` | Song is not: \`Paused\``);

      return interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      await player.pause(false);

      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`▶️\` | Song has been: \`Resumed\``);

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
