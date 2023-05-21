const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "autoplay",
    description: "Autoplay random related song/s.",
    category: "Utility",
    permissions: {
        bot: [],
        channel: [],
        user: ["ManageGuild"],
    },
    settings: {
        inVc: true,
        sameVc: true,
        player: true,
        current: true,
        owner: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const currentsong = player.currentTrack.info;

        const ytUri = /^(https?:\/\/)?(www\.)?(m\.)?(music\.)?(youtube\.com|youtu\.?be)\/.+$/gi.test(currentsong.uri);

        if (!ytUri) {
            const embed = new EmbedBuilder().setDescription(`\`❌\` | Autoplay feature only support YouTube!`).setColor(client.color);

            return interaction.editReply({ embeds: [embed] });
        }

        if (player.autoplay === true) {
            player.autoplay = false;

            await player.queue.clear();

            const embed = new EmbedBuilder().setDescription(`\`🔴\` | Autoplay has been: \`Disabled\``).setColor(client.color);

            return interaction.editReply({ embeds: [embed] });
        } else {
            player.autoplay = true;

            if (ytUri) {
                const identifier = currentsong.identifier;
                const search = `https://music.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
                const res = await client.poru.resolve({ query: search, source: "ytmsearch", requester: interaction.user });

                await player.queue.add(res.tracks[Math.floor(Math.random() * res.tracks.length) ?? 1]);

                const embed = new EmbedBuilder().setDescription(`\`🔵\` | Autoplay has been: \`Enabled\``).setColor(client.color);

                return interaction.editReply({ embeds: [embed] });
            }
        }
    },
};
