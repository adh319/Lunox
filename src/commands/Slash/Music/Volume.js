const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const delay = require("delay");

module.exports = {
    name: "volume",
    description: "Set the volume of the current player.",
    category: "Music",
    options: [
        {
            name: "amount",
            description: "The number of volume which you want to set.",
            type: ApplicationCommandOptionType.Number,
            required: false,
            min_value: 1,
            max_value: 100,
        },
    ],
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
        const value = interaction.options.getNumber("amount");

        if (!value) {
            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`🔊\` | Current player volume: \`${player.volume}%\``);

            return interaction.editReply({ embeds: [embed], ephemeral: true });
        } else {
            await player.setVolume(value);

            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`🔊\` | Volume has been set to: \`${value}%\``);

            return interaction.editReply({ embeds: [embed], ephemeral: true });
        }
    },
};
