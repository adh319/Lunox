const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'shuffle',
  description: 'Shuffle the current player queue.',
  category: 'Music',
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);

    if (!player.queue.length) {
        
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`❌\` | Queue is: \`Empty\``);
        
      return interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      await player.queue.shuffle();

      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`🔀\` | Queue has been: \`Shuffled\``);
        
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
