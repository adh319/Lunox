const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "clearqueue",
  description: "Clear the current player queue.",
  category: "Music",
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const player = client.poru.players.get(interaction.guild.id);

    if (!player.queue.length) {
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`❌\` | Player queue is: \`Empty\``);

      return interaction.editReply({ embeds: [embed] });
    } else {
      const { length } = player.queue;

      await player.queue.clear();

      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`📛\` | \`${length}\` Queue has been: \`Cleared\``);

      return interaction.editReply({ embeds: [embed] });
    }
  },
};
