const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "previous",
    description: "Return to the previous song.",
    category: "Music",
    permissions: {
        bot: [],
        channel: [],
        user: [],
    },
    settings: {
        inVc: true,
        sameVc: true,
        player: true,
        current: true,
        owner: false,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const player = client.poru.players.get(interaction.guild.id);

        if (!player.previousTrack) {
            const embed = new EmbedBuilder().setDescription(`\`❌\` | Previous song was: \`Not found\``).setColor(client.color);

            return interaction.editReply({ embeds: [embed] });
        }

        await player.queue.unshift(player.previousTrack);
        await player.stop();

        const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`⏮️\` | Song has been: \`Previoused\``);

        return interaction.editReply({ embeds: [embed] });
    },
};
