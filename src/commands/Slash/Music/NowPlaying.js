const { EmbedBuilder } = require("discord.js");
const formatDuration = require("../../../structures/FormatDuration.js");
const GControl = require("../../../settings/models/Control.js");
const capital = require("node-capitalize");

module.exports = {
    name: "nowplaying",
    description: "Show the current playing song.",
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
        current: true,
        owner: false,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const Control = await GControl.findOne({ guild: interaction.guild.id });

        // When button control "enable", this will make command unable to use. You can delete this
        if (Control.playerControl === "enable") {
            const ctrl = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`❌\` | You can't use this command as the player control was enable!`);
            return interaction.editReply({ embeds: [ctrl] });
        }

        const player = client.poru.players.get(interaction.guild.id);
        if (!player.currentTrack) return;

        try {
            const sources = capital(player.currentTrack.info.sourceName);
            const Titles =
                player.currentTrack.info.title.length > 20
                    ? player.currentTrack.info.title.substr(0, 20) + "..."
                    : player.currentTrack.info.title;
            const Author =
                player.currentTrack.info.author.length > 20
                    ? player.currentTrack.info.author.substr(0, 20) + "..."
                    : player.currentTrack.info.author;
            const currentPosition = formatDuration(player.position);
            const trackDuration = formatDuration(player.currentTrack.info.length);
            const playerDuration = player.currentTrack.info.isStream ? "LIVE" : trackDuration;
            const currentAuthor = player.currentTrack.info.author ? Author : "Unknown";
            const currentTitle = player.currentTrack.info.title ? Titles : "Unknown";
            const Part = Math.floor((player.position / playerDuration) * 30);
            const Emoji = player.isPlaying ? "🕒 |" : "⏸ |";

            const embed = new EmbedBuilder()
                .setAuthor({
                    name: player.isPlaying ? `Now Playing` : `Song Paused`,
                    iconURL: "https://cdn.discordapp.com/attachments/1014342568554811443/1025740239236517908/music-disc.gif",
                })
                .setThumbnail(player.currentTrack.info.image)
                .setDescription(`**[${currentTitle}](${player.currentTrack.info.uri})**`)
                .addFields([
                    { name: `Author:`, value: `${currentAuthor}`, inline: true },
                    { name: `Requested By:`, value: `${player.currentTrack.info.requester}`, inline: true },
                    { name: `Source:`, value: `${sources}`, inline: true },
                    { name: `Duration:`, value: `${playerDuration}`, inline: true },
                    { name: `Volume:`, value: `${player.volume}%`, inline: true },
                    { name: `Queue Left:`, value: `${player.queue.length}`, inline: true },
                    {
                        name: `Song Progress: \`[${currentPosition}]\``,
                        value: `\`\`\`${Emoji} ${"─".repeat(Part) + "🔵" + "─".repeat(30 - Part)}\`\`\``,
                        inline: false,
                    },
                ])
                .setColor(client.color)
                .setFooter({ text: `© ${client.user.username}` })
                .setTimestamp();

            return interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(error);
            return interaction.reply({ content: `\`❌\` | There isn't current playing song or song has been ended!`, ephemeral: true });
        }
    },
};
