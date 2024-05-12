const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const Guild = require("../../../settings/models/Guild.js");

module.exports = {
    name: "loop",
    description: "Set loop mode to current song.",
    category: "Music",
    options: [
        {
            name: "mode",
            description: "Choose loop mode for current player.",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "current",
                    value: "current",
                },
                {
                    name: "queue",
                    value: "queue",
                },
            ],
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
        current: true,
        owner: false,
        premium: false,
    },
    run: async (client, interaction, player) => {
        await interaction.deferReply({ ephemeral: true });

        const data = await Guild.findOne({ Id: interaction.guild.id });
        const control = data.playerControl;

        // When button control "enable", this will make command unable to use. You can delete this
        if (control === "enable") {
            const ctrl = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`❌\` | You can't use this command as the player control was enable!`);
            return interaction.editReply({ embeds: [ctrl] });
        }

        const input = interaction.options.getString("mode");

        if (input === "current") {
            if (player.loop === "TRACK") {
                await player.setLoop("NONE");

                const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`🔂\` | Loop mode has been: \`Disabled\``);

                return interaction.editReply({ embeds: [embed] });
            } else {
                await player.setLoop("track");

                const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`🔂\` | Loop mode has been set to: \`Current\``);

                return interaction.editReply({ embeds: [embed] });
            }
        } else if (input === "queue") {
            if (player.loop === "QUEUE") {
                await player.setLoop("NONE");

                const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`🔁\` | Loop mode has been: \`Disabled\``);

                return interaction.editReply({ embeds: [embed] });
            } else {
                player.setLoop("QUEUE");

                const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`🔁\` | Loop mode has been set to: \`Queue\``);

                return interaction.editReply({ embeds: [embed] });
            }
        }
    },
};
