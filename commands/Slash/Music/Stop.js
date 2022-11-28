const { EmbedBuilder } = require("discord.js");
const nplaying = require("../../../poruEvents/trackStart.js");
const formatDuration = require("../../../structures/FormatDuration.js");

module.exports = {
  name: "stop",
  description: "Disconnect the bot from your voice channel.",
  category: "Music",
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });
    
    const player = client.poru.players.get(interaction.guildId);

    await player.destroy();

    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setDescription(`\`👋\` | Player has been: \`Disconnected\``);

    return interaction.editReply({ embeds: [embed] });
  },
};
