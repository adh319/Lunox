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
    await interaction.deferReply({ ephemeral: false });
    
    const player = client.poru.players.get(interaction.guild.id);

    if (!player.isPaused) {
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`❌\` | Song is not: \`Paused\``);

      return interaction.editReply({ embeds: [embed] });
    } else {
      await player.pause(false);

      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`▶️\` | Song has been: \`Resumed\``);

      return interaction.editReply({ embeds: [embed] });
    }
  },
};
