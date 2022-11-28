const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Check latency of bot!",
  category: "Information",
  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setDescription(`\`🏓\` | **Pong:** \`${Math.round(client.ws.ping)}ms\``)
      .setColor(client.color);

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
