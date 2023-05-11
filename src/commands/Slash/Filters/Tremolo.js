const { EmbedBuilder } = require("discord.js");
const delay = require("delay");

module.exports = {
    name: "tremolo",
    description: "Set the current player filter to Tremolo.",
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
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const player = client.poru.players.get(interaction.guild.id);

        await player.filters.setTremolo(true);

        const embed = new EmbedBuilder().setDescription(`\`🔩\` | Filter has been set to: \`Tremolo\``).setColor(client.color);

        await delay(2000);
        return interaction.editReply({ embeds: [embed] });
    },
};
