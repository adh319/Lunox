const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const formatDuration = require("../../../structures/FormatDuration.js");

module.exports = {
  name: "seek",
  description: "Seek the current played song.",
  category: "Music",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  options: [
    {
      name: "seconds",
      description: "New position length of the song.",
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 0,
    },
  ],
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });
    const player = client.poru.players.get(interaction.guild.id);

    const position = interaction.options.getNumber("seconds", true);
    const Duration = formatDuration(position * 1000);

    if (!player.currentTrack.info.isSeekable) {
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`❌\` | Song is not seekable`);

      return interaction.editReply({ embeds: [embed] });
    } else {
      await player.seekTo(position * 1000);

      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`⏩\` | Song seeked to: \`${Duration}\``);

      return interaction.editReply({ embeds: [embed] });
    }
  },
};
