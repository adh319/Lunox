const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "skip",
  description: "Skip the current played song.",
  category: "Music",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });
    const player = client.poru.players.get(interaction.guild.id);

    if (!player || player.queue.size == 0) {
      const embed = new EmbedBuilder()
        .setDescription(`\`❌\` | Next song was: \`Not found\``)
        .setColor(client.color);

      return interaction.editReply({ embeds: [embed] });
    } else {
      await player.stop();

      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`⏭️\` | Song has been: \`Skipped\``);

      return interaction.editReply({ embeds: [embed] });
    }
  },
};
