const { EmbedBuilder } = require("discord.js");
const delay = require("delay");

module.exports = {
    name: "karaoke",
    description: "Set the current player filter to Karaoke.",
    category: "Filters",
    permissions: {
        bot: [],
        channel: [],
        user: [],
    },
    settings: {
        inVc: false,
        sameVc: true,
        player: true,
        current: true,
        owner: false,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const player = client.poru.players.get(interaction.guild.id);

        await player.filters.setKaraoke(true);

        const embed = new EmbedBuilder().setDescription(`\`🔩\` | Filter has been set to: \`Karaoke\``).setColor(client.color);

        await delay(2000);
        return interaction.editReply({ embeds: [embed] });
    },
};
