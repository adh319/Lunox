const { EmbedBuilder } = require("discord.js");
const { createPage } = require("../../../functions/createPage.js");
const lodash = require("lodash");

module.exports = {
    name: "lavalink",
    aliases: ["node"],
    description: "View lavalink status",
    category: "dev",
    permissions: {
        bot: [],
        user: [],
    },
    settings: {
        voice: false,
        player: false,
        current: false,
    },
    devOnly: true,
    run: async (client, message, player, args) => {
        const ms = (await import("pretty-ms")).default;
        const embed = new EmbedBuilder().setColor(client.config.embedColor);

        try {
            const nodes = client.rainlink.nodes.all();

            if (!nodes || nodes.length === 0) {
                embed.setDescription(`No lavalink nodes found.`);

                return message.reply({ embeds: [embed] });
            }

            const nodeInfo = nodes.map((node) => {
                const online = node.online ? "Online" : "Offline";
                const { players, playingPlayers: playing, uptime, memory, cpu } = node.stats;
                const formattedUptime = ms(uptime, { compact: true });

                const nodeInfo = {
                    name: node.options.name,
                    host: node.options.host,
                    port: node.options.port,
                    auth: node.options.auth,
                    secure: node.options.secure,
                    driver: node.options.driver,
                };

                const memoryInfo = {
                    used: (memory.used / 1024 / 1024).toFixed(2),
                    free: (memory.free / 1024 / 1024).toFixed(2),
                    allocated: (memory.allocated / 1024 / 1024).toFixed(2),
                    reservable: (memory.reservable / 1024 / 1024).toFixed(2),
                };

                const cpuInfo = {
                    cores: cpu.cores,
                    systemLoad: (cpu.systemLoad * 100).toFixed(2),
                    lavalinkLoad: (cpu.lavalinkLoad * 100).toFixed(2),
                };

                return formatNodeInfo(nodeInfo, online, players, playing, formattedUptime, memoryInfo, cpuInfo);
            });

            const pages = lodash.chunk(nodeInfo, 1).map((s) => s.join(""));

            return createPage(client, message, embed, pages);
        } catch (error) {
            console.error(error);
            embed.setDescription(`An error occurred while fetching the Lavalink node information.`);

            return message.reply({ embeds: [embed] });
        }
    },
};

function formatNodeInfo(nodeInfo, online, players, playing, formattedUptime, memoryInfo, cpuInfo) {
    return `\`\`\`yaml
- General Info
  - Name: ${nodeInfo.name}
  - Host: ${nodeInfo.host}
  - Port: ${nodeInfo.port}
  - Auth: ${nodeInfo.auth}
  - Secure: ${nodeInfo.secure}
  - Driver: ${nodeInfo.driver}
  
- Status Info
  - Connection: ${online}
  - Players: ${players}
  - Playing: ${playing}
  - Uptime: ${formattedUptime}
  
- Memory Info
  - Used: ${memoryInfo.used}MB
  - Free: ${memoryInfo.free}MB
  - Allocated: ${memoryInfo.allocated}MB
  - Reservable: ${memoryInfo.reservable}MB
  
- CPU Info
  - Cores: ${cpuInfo.cores}
  - System Load: ${cpuInfo.systemLoad}%
  - Lavalink Load: ${cpuInfo.lavalinkLoad}%
\`\`\``;
}

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
