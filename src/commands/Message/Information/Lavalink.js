const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "lavalink",
    description: "Displays the node status.",
    category: "Information",
    aliases: ["node"],
    owner: true,
    run: async (client, message) => {
        const nodes = client.poru.leastUsedNodes;

        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${client.user.username} Node Info!`,
                iconURL: message.guild.iconURL({ dynamic: true }),
            })
            .setColor(client.color)
            .setTimestamp(Date.now());

        for (const node of nodes) {
            const stats = node.stats;
            const fields = [
                {
                    name: `**Node ${node.name} Connected **`,
                    value: `\`\`\`Connected: ${node.stats.players}\nPlaying: ${node.stats.playingPlayers}\nUptime: ${new Date(
                        node.stats.uptime,
                    )
                        .toISOString()
                        .slice(11, 19)}\`\`\``,
                    inline: false,
                },
                {
                    name: "CPU Info",
                    value: `\`\`\`Cores: ${node.stats.cpu.cores}\nSystem Load: ${(
                        Math.round(node.stats.cpu.systemLoad * 100) / 100
                    ).toFixed(2)}%\nLavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%\`\`\``,
                    inline: false,
                },
                {
                    name: "Memory Info",
                    value: `\`\`\`Reservable Memory: ${Math.round(node.stats.memory.reservable / 1024 / 1024)}mb\nUsed Memory: ${Math.round(
                        node.stats.memory.used / 1024 / 1024,
                    )}mb\nFree Memory: ${Math.round(node.stats.memory.free / 1024 / 1024)}mb\nAllocated Memory: ${Math.round(
                        node.stats.memory.allocated / 1024 / 1024,
                    )}mb\`\`\``,
                    inline: false,
                },
            ];

            embed.addFields(fields);
        }

        return message.channel.send({ embeds: [embed] });
    },
};
