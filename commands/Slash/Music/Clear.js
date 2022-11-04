const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'clear',
  description: 'Clear the current player queue.',
  category: 'Music',
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);

    if (!player.queue.length) {
      
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`❌\` | Player queue is: \`Empty\``);
        
      return interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      const { length } = player.queue;

      await player.queue.clear();
    
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`📛\` | \`${length}\` Queue has been: \`Cleared\``);
        
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
