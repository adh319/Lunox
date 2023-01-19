const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "lavalink",
    description: "Displays the node status.",
    category: "Information",
    aliases: ["node"],
    owner: true,
    run: async (client, message) => {
        const node = client.poru.leastUsedNodes[0];

        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${client.user.username} Node Info!`,
                iconURL: message.guild.iconURL({ dynamic: true }),
            })
            .addFields([
                {
                    name: `**Node ${node.name} Connected**`,
                    value: `\`\`\`Player: ${node.stats.players}\nPlaying Players: ${node.stats.playingPlayers}\nUptime: ${new Date(
                        node.stats.uptime
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
                        node.stats.memory.used / 1024 / 1024
                    )}mb\nFree Memory: ${Math.round(node.stats.memory.free / 1024 / 1024)}mb\nAllocated Memory: ${Math.round(
                        node.stats.memory.allocated / 1024 / 1024
                    )}mb\`\`\``,
                    inline: false,
                },
            ])
            .setColor(client.color)
            .setTimestamp(Date.now());

        return message.channel.send({ embeds: [embed] });
    },
};
