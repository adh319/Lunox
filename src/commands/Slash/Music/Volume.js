const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const GControl = require("../../../settings/models/Control.js");

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

        const Control = await GControl.findOne({ guild: interaction.guild.id });

        // When button control "enable", this will make command unable to use. You can delete this
        if (Control.playerControl === "enable") {
            const ctrl = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`❌\` | You can't use this command as the player control was enable!`);
            return interaction.editReply({ embeds: [ctrl] });
        }

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
