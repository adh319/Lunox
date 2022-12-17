const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "join",
  description: "Invite bot to your voice channel.",
  category: "Music",
  permissions: {
    bot: ["Speak", "Connect"],
    user: [],
  },
  settings: {
    inVc: true,
    sameVc: false,
    player: false,
    current: false,
    owner: false,
  },
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });

    client.poru.createConnection({
      guildId: interaction.guild.id,
      voiceChannel: interaction.member.voice.channel.id,
      textChannel: interaction.channel.id,
      deaf: true,
    });

    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setDescription(`\`☑️\` | Joined to ${interaction.member.voice.channel.toString()}`);

    return interaction.editReply({ embeds: [embed] });
  },
};
