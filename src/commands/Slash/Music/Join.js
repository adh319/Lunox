const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "join",
    description: "Invite bot to your voice channel.",
    category: "Music",
    permissions: {
        bot: ["Speak", "Connect"],
        channel: ["Speak", "Connect"],
        user: [],
    },
    settings: {
        inVc: true,
        sameVc: false,
        player: false,
        current: false,
        owner: false,
        premium: false,
    },
    run: async (client, interaction, player) => {
        await interaction.deferReply({ ephemeral: false });

        if (player) {
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`❌\` | I am already in a voice channel.`);

            return interaction.editReply({ embeds: [embed] });
        }

        if (!interaction.member.voice.channel) {
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`❌\` | You need to be in a voice channel to use this command.`);

            return interaction.editReply({ embeds: [embed] });
        }

        try {
            player = await client.poru.createConnection({
                guildId: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                region: interaction.member.voice.channel.rtcRegion || undefined,
                deaf: true,
            });

            await player.connect();

            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`☑️\` | Joined to ${interaction.member.voice.channel.toString()}`);

            return interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error("Error while joining the voice channel:", error);
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`❌\` | An error occurred while joining the voice channel.`);

            return interaction.editReply({ embeds: [embed] });
        }
    },
};
