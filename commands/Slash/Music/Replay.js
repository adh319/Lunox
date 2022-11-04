const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'replay',
  description: 'Replay the current song.',
  category: 'Music',
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);

    if (!player.currentTrack.info.isSeekable) {
        
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`❌\` | Song can't be replay`);

      return interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      await player.seekTo(0);

      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`⏪\` | Song has been: \`Replayed\``);

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
