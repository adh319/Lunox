const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Check latency of bot!",
  category: "Information",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });
    
    const embed = new EmbedBuilder()
      .setDescription(`\`🏓\` | **Pong:** \`${Math.round(client.ws.ping)}ms\``)
      .setColor(client.color);

    return interaction.editReply({ embeds: [embed] });
  },
};
