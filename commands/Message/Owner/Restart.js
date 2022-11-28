const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "restart",
  aliases: ["reboot"],
  description: "Shuts down the client!",
  run: async (client, message) => {
    if (!client.owner.includes(message.author.id)) {
      return message.reply({ content: `You're not the client owner!` });
    }

    const embed = new EmbedBuilder()
      .setDescription(`\`🤖\` | Bot is: \`Restarting\``)
      .setColor(client.color);

    await message.reply({ embeds: [embed] });

    process.exit();
  },
};
