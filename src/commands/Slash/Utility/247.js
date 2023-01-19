const { EmbedBuilder } = require("discord.js");
const Reconnect = require("../../../settings/models/247.js");
const User = require("../../../settings/models/User.js");

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
        premium: true,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const player = client.poru.players.get(interaction.guild.id);

        let data = await Reconnect.findOne({ guild: interaction.guild.id });

        if (data) {
            await data.delete();

            const off = new EmbedBuilder().setDescription(`\`🔴\` | 247 Mode has been: \`Disabled\``).setColor(client.color);

            return interaction.editReply({ embeds: [off] });
        } else if (!data) {
            /// This will execute when premium settings is set to "true" [Disable code on line 56 to 66 to use this!!!]
            const user = await User.findOne({ Id: interaction.user.id });

            let expired = Date.now() + user.premium.expiresAt; // this will make the command activated til the user premium expired

            data = new Reconnect({
                guild: player.guildId,
                text: player.textId,
                voice: player.voiceId,
                time: expired,
            });

            await data.save();

            const on = new EmbedBuilder().setDescription(`\`🔵\` | 247 Mode has been: \`Enabled\``).setColor(client.color);

            return interaction.editReply({ embeds: [on] });
            ///

            /// This will execute when premium settings is set to "false" [Disable code on line 37 to 52 to use this!!!]
            /*data = new Reconnect({
                guild: player.guildId,
                text: player.textId,
                voice: player.voiceId,
            });

            await data.save();

            const on = new EmbedBuilder().setDescription(`\`🔵\` | 247 Mode has been: \`Enabled\``).setColor(client.color);

            return interaction.editReply({ embeds: [on] });*/
            ///
        }
    },
};
