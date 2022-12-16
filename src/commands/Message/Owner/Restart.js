const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "restart",
	description: "Shuts down the client!",
	category: "Owner",
	aliases: ["reboot"],
	permissions: {
		bot: [],
		user: [],
	},
	settings: {
		inVc: false,
		sameVc: false,
		player: false,
		current: false,
		owner: true,
	},
	run: async (client, message) => {
		const embed = new EmbedBuilder().setDescription(`\`🤖\` | Bot is: \`Restarting\``).setColor(client.color);

		await message.reply({ embeds: [embed] });

		process.exit();
	},
};
