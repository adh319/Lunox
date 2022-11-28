const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "remove",
  description: "Remove a song from the queue.",
  category: "Music",
  inVc: true,
  sameVc: true,
  player: true,
  options: [
    {
      name: "song",
      description: "Position of the song.",
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 1,
    },
  ],
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });
    
    const player = client.poru.players.get(interaction.guild.id);

    const track = interaction.options.getNumber("song");

    if (track > player.queue.length) {
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`❌\` | Song was not found`);

      return interaction.editReply({ embeds: [embed] });
    }
    await player.queue.remove(track - 1);

    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setDescription(`\`✅\` | Song has been: \`Removed\``);

    return interaction.editReply({ embeds: [embed] });
  },
};
