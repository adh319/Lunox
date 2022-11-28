const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const delay = require("delay");

module.exports = {
  name: "filter",
  description: "Set filter for current player.",
  category: "Music",
  inVc: true,
  sameVc: true,
  player: true,
  options: [
    {
      name: "8d",
      description: "Turning on 8d filter.",
      type: 1,
    },
    {
      name: "bassboost",
      description: "Turning on bassboost filter.",
      type: 1,
    },
    {
      name: "earrape",
      description: "Turning on earrape filter.",
      type: 1,
    },
    {
      name: "karaoke",
      description: "Turning on karaoke filter.",
      type: 1,
    },
    {
      name: "timescale",
      description: "Turning on timescale filter.",
      type: 1,
    },
    {
      name: "tremelo",
      description: "Turning on tremelo filter.",
      type: 1,
    },
    {
      name: "vibrato",
      description: "Turning on vibrato filter.",
      type: 1,
    },
    {
      name: "rotation",
      description: "Turning on rotation filter.",
      type: 1,
    },
    {
      name: "distortion",
      description: "Turning on distortion filter.",
      type: 1,
    },
    {
      name: "channelmix",
      description: "Turning on channelmix filter.",
      type: 1,
    },
    {
      name: "lowpass",
      description: "Turning on lowpass filter.",
      type: 1,
    },
    {
      name: "nightcore",
      description: "Turning on nightcore filter.",
      type: 1,
    },
    {
      name: "vaporwave",
      description: "Turning on vaporwave filter.",
      type: 1,
    },
    {
      name: "clear",
      description: "Clear player filters set.",
      type: 1,
    },
  ],
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const player = client.poru.players.get(interaction.guild.id);

    if (interaction.options.getSubcommand() === "clear") {
      await player.filters.clearFilters();
      await player.setVolume(1.0);

      const embed = new EmbedBuilder()
        .setDescription(`\`✅\` | Filters has been: \`Cleared\``)
        .setColor(client.color);

      await delay(2000);
      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "8d") {
      await player.filters.set8D(true);

      const embed = new EmbedBuilder()
        .setDescription(`\`🔩\` | 8d filter: \`Enabled\``)
        .setColor(client.color);

      await delay(2000);
      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "bassboost") {
      await player.filters.setBassboost(true);

      const embed = new EmbedBuilder()
        .setDescription(`\`🔩\` | Bassboost filter: \`Enabled\``)
        .setColor(client.color);

      await delay(2000);
      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "earrape") {
      await player.setVolume(5.0);

      const embed = new EmbedBuilder()
        .setDescription(`\`🔩\` | Bassboost filter: \`Enabled\``)
        .setColor(client.color);

      await delay(2000);
      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "karaoke") {
      await player.filters.setKaraoke(true);

      const embed = new EmbedBuilder()
        .setDescription(`\`🔩\` | Karaoke filter: \`Enabled\``)
        .setColor(client.color);

      await delay(2000);
      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "timescale") {
      await player.filters.setTimescale(true);

      const embed = new EmbedBuilder()
        .setDescription(`\`🔩\` | Timescale filter: \`Enabled\``)
        .setColor(client.color);

      await delay(2000);
      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "tremelo") {
      await player.filters.setTremolo(true);

      const embed = new EmbedBuilder()
        .setDescription(`\`🔩\` | Tremolo filter: \`Enabled\``)
        .setColor(client.color);

      await delay(2000);
      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "vibrato") {
      await player.filters.setVibrato(true);

      const embed = new EmbedBuilder()
        .setDescription(`\`🔩\` | Vibrato filter: \`Enabled\``)
        .setColor(client.color);

      await delay(2000);
      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "rotation") {
      await player.filters.setRotation(true);

      const embed = new EmbedBuilder()
        .setDescription(`\`🔩\` | Rotation filter: \`Enabled\``)
        .setColor(client.color);

      await delay(2000);
      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "distortion") {
      await player.filters.setDistortion(true);

      const embed = new EmbedBuilder()
        .setDescription(`\`🔩\` | Distortion filter: \`Enabled\``)
        .setColor(client.color);

      await delay(2000);
      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "channelmix") {
      await player.filters.setChannelMix(true);

      const embed = new EmbedBuilder()
        .setDescription(`\`🔩\` | ChannelMix filter: \`Enabled\``)
        .setColor(client.color);

      await delay(2000);
      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "lowpass") {
      await player.filters.setLowPass(true);

      const embed = new EmbedBuilder()
        .setDescription(`\`🔩\` | LowPass filter: \`Enabled\``)
        .setColor(client.color);

      await delay(2000);
      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "nightcore") {
      await player.filters.setNightcore(true);

      const embed = new EmbedBuilder()
        .setDescription(`\`🔩\` | Nightcore filter: \`Enabled\``)
        .setColor(client.color);

      await delay(2000);
      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "vaporwave") {
      await player.filters.setVaporwave(true);

      const embed = new EmbedBuilder()
        .setDescription(`\`🔩\` | Vaporwave filter: \`Enabled\``)
        .setColor(client.color);

      await delay(2000);
      return interaction.editReply({ embeds: [embed] });
    }
  },
};
