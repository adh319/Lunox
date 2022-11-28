const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  name: "help",
  description: "Display all commands of the bot.",
  category: "Information",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setAuthor({
        name: `${interaction.guild.members.me.displayName} Help Command!`,
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      })
      .setThumbnail(
        client.user.displayAvatarURL({ dynamic: true, size: 2048 })
      );
    const categories = readdirSync("./commands/Slash/");

    embed.setDescription(`The bot prefix is: **/**`);
    embed.setFooter({
      text: `© ${interaction.guild.members.me.displayName} | Total Commands: ${client.slashCommands.size}`,
      iconURL: client.user.displayAvatarURL({ dynamic: true }),
    });

    categories.forEach((category) => {
      const dir = client.slashCommands.filter((c) => c.category === category);
      const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);

      try {
        embed.addFields({
          name: `❯ ${capitalise} [\`${dir.size}\`]:`,
          value: `${dir.map((c) => `\`${c.name}\``).join(", ")}`,
          inline: false,
        });
      } catch (e) {
        console.log(e);
      }
    });

    return interaction.editReply({ embeds: [embed] });
  },
};
