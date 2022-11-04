const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'join',
  description: 'Invite bot to your voice channel.',
  category: 'Music',
  inVc: true,
  run: async (client, interaction) => {
    client.poru.createConnection({
      guildId: interaction.guild.id,
      voiceChannel: interaction.member.voice.channel.id,
      textChannel: interaction.channel.id,
      deaf: true,
    });

    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setDescription(`\`✅\` | Joined ${interaction.member.voice.channel.toString()}`);

    return interaction.reply({ embeds: [embed] });
  },
};
