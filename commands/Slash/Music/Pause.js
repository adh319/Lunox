const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "pause",
  description: "Pause current played song.",
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
        .setDescription(`\`❌\` | Song is already: \`Paused\``);

      return interaction.editReply({ embeds: [embed] });
    } else {
      await player.pause(true);

      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`⏸️\` | Song has been: \`Paused\``);

      return interaction.editReply({ embeds: [embed] });
    }
  },
};
