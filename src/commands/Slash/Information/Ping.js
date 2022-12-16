const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "ping",
	description: "Check latency of bot!",
	category: "Information",
	permissions: {
		bot: [],
		user: [],
	},
	settings: {
		inVc: false,
		sameVc: false,
		player: false,
		current: false,
		owner: false,
	},
	run: async (client, interaction) => {
		await interaction.deferReply({ ephemeral: true });

		const embed = new EmbedBuilder().setDescription(`\`🏓\` | **Pong:** \`${Math.round(client.ws.ping)}ms\``).setColor(client.color);

		return interaction.editReply({ embeds: [embed] });
	},
};
