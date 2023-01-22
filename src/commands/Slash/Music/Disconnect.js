const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "disconnect",
    description: "Force Disconnect the bot from your voice channel.",
    category: "Music",
    permissions: {
        bot: [],
        channel: [],
        user: ["ManageGuild"],
    },
    settings: {
        inVc: true,
        sameVc: true,
        player: true,
        current: false,
        owner: false,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const player = client.poru.players.get(interaction.guild.id);

        if (player.message) await player.message.delete();

        await player.destroy();

        const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`👋\` | Player has been: \`Disconnected\``);

        return interaction.editReply({ embeds: [embed] });
    },
};
