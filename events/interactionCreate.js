const { EmbedBuilder, InteractionType } = require("discord.js");

module.exports.run = async (client, interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand) {
    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    const player = client.poru.players.get(interaction.guild.id);
    const memberChannel = interaction.member.voice.channelId;
    const botChannel = interaction.guild.members.me.voice.channelId;

    //Voice Channel only
    if (command.inVc && !memberChannel) {
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `\`❌\` | You must be in a Voice channel to use this command.`
        );

      return interaction.reply({ embeds: [embed], ephmeral: true });
    }
    //Same Voice Channel only
    if (command.sameVc && player && botChannel !== memberChannel) {
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `\`❌\` | You must be in the same Voice channel as mine to use this command.`
        );

      return interaction.reply({ embeds: [embed], ephmeral: true });
    }

    //Player check
    if (command.player && !player) {
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`❌\` | No player exists for this server.`);

      return interaction.reply({ embeds: [embed], ephmeral: true });
    }

    if (command.current && !player.currentTrack) {
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`❌\` | There is nothing playing right now.`);

      return interaction.reply({ embeds: [embed], ephmeral: true });
    }

    //Error handling

    try {
      command.run(client, interaction);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: `Something went wrong.`,
        ephmeral: true,
      });
    }
  }
};
