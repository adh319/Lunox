const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "shuffle",
    description: "Shuffle the current player queue.",
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
        current: false,
        owner: false,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const player = client.poru.players.get(interaction.guild.id);

        if (!player.queue.length) {
            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`❌\` | Queue was: \`Empty\``);

            return interaction.editReply({ embeds: [embed] });
        } else {
            await player.queue.shuffle();

            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`🔀\` | Queue has been: \`Shuffled\``);

            return interaction.editReply({ embeds: [embed] });
        }
    },
};
