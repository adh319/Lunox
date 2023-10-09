const { EmbedBuilder } = require("discord.js");
const Guild = require("../../../settings/models/Guild.js");

module.exports = {
    name: "247",
    description: "Toggle enable 24/7 in voice channel.",
    category: "Utility",
    permissions: {
        bot: ["Speak", "Connect"],
        channel: ["Speak", "Connect"],
        user: ["Administrator"],
    },
    settings: {
        inVc: true,
        sameVc: true,
        player: true,
        current: false,
        owner: false,
        premium: false,
    },
    run: async (client, interaction, player) => {
        await interaction.deferReply({ ephemeral: true });

        const data = await Guild.findOne({ Id: interaction.guild.id });
        const reconnect = data.reconnect;

        if (reconnect.status === true) {
            reconnect.status = false;
            reconnect.voice = null;
            reconnect.text = null;

            await data.save();

            const off = new EmbedBuilder().setDescription(`\`🔴\` | 247 Mode has been: \`Disabled\``).setColor(client.color);

            return interaction.editReply({ embeds: [off] });
        }

        if (reconnect.status === false) {
            reconnect.status = true;
            reconnect.voice = player.voiceChannel;
            reconnect.text = interaction.channel.id;

            await data.save();

            const on = new EmbedBuilder().setDescription(`\`🔵\` | 247 Mode has been: \`Enabled\``).setColor(client.color);

            return interaction.editReply({ embeds: [on] });
        }
    },
};
