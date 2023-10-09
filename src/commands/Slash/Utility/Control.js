const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const Guild = require("../../../settings/models/Guild.js");

module.exports = {
    name: "control",
    description: "Display or hide the player control button. [Premium]",
    category: "Utility",
    options: [
        {
            name: "mode",
            description: "Choose display or hide",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "Display",
                    value: "display",
                },
                {
                    name: "Hide",
                    value: "hide",
                },
            ],
        },
    ],
    permissions: {
        bot: [],
        channel: [],
        user: ["ManageGuild"],
    },
    settings: {
        inVc: false,
        sameVc: false,
        player: false,
        current: false,
        owner: false,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const choice = interaction.options.getString("mode");

        let data = await Guild.findOne({ Id: interaction.guild.id });
        const control = data.playerControl;

        if (choice === "display") {
            if (control === "enable") {
                const embed = new EmbedBuilder().setDescription(`\`🔴\` | Control already set to: \`Enable\``).setColor(client.color);

                return interaction.editReply({ embeds: [embed] });
            }

            control = "enable";

            await data.save();

            const embed = new EmbedBuilder().setDescription(`\`🔵\` | Control has been set to: \`Enable\``).setColor(client.color);

            return interaction.editReply({ embeds: [embed] });
        }

        if (choice === "hide") {
            if (control === "disable") {
                const embed = new EmbedBuilder().setDescription(`\`🔴\` | Control already set to: \`Disable\``).setColor(client.color);

                return interaction.editReply({ embeds: [embed] });
            }

            control = "disable";

            await data.save();

            const embed = new EmbedBuilder().setDescription(`\`🔵\` | Control has been set to: \`Disable\``).setColor(client.color);

            return interaction.editReply({ embeds: [embed] });
        }
    },
};
