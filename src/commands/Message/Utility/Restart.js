const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "restart",
    description: "Shuts down the client!",
    category: "Utility",
    aliases: ["reboot"],
    owner: true,
    run: async (client, message) => {
        const embed = new EmbedBuilder().setDescription(`\`🤖\` | Bot is: \`Restarting\``).setColor(client.color);

        await message.reply({ embeds: [embed] });

        process.exit();
    },
};
