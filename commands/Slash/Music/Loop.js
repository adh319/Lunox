const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "loop",
  description: "Set loop mode to current song.",
  category: "Music",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  options: [
    {
      name: "mode",
      description: "Choose loop mode for current player.",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "current",
          value: "current",
        },
        {
          name: "queue",
          value: "queue",
        },
      ],
    },
  ],

  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);

    const input = interaction.options.getString("mode");

    if (input === "current") {
      if (player.loop === "TRACK") {
        await player.setLoop("NONE");

        const embed = new EmbedBuilder()
          .setColor(client.color)
          .setDescription(`\`🔂\` | Loop mode has been: \`Disabled\``);

        return interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        await player.setLoop("TRACK");

        const embed = new EmbedBuilder()
          .setColor(client.color)
          .setDescription(`\`🔂\` | Loop mode has been set to: \`Current\``);

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (input === "queue") {
      if (player.loop === "QUEUE") {
        await player.setLoop("NONE");

        const embed = new EmbedBuilder()
          .setColor(client.color)
          .setDescription(`\`🔁\` | Loop mode has been: \`Disabled\``);

        return interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        player.setLoop("QUEUE");

        const embed = new EmbedBuilder()
          .setColor(client.color)
          .setDescription(`\`🔁\` | Loop mode has been set to: \`Queue\``);

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }
    }
  },
};
