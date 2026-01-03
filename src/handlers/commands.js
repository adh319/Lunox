const { readdirSync } = require("node:fs");
const path = require("node:path");
const Logger = require("../utils/logger");

module.exports = (client) => {
    try {
        const data = [];

        readdirSync("./src/commands/interaction/").forEach((dir) => {
            const commands = readdirSync(`./src/commands/interaction/${dir}/`).filter((file) => file.endsWith(".js"));

            for (const file of commands) {
                const pull = require(path.join(__dirname, `../commands/interaction/${dir}/${file}`));

                if (pull.name) {
                    client.slash.set(pull.name, pull);
                    data.push(pull);
                } else {
                    continue;
                }
            }
        });

        client.on("clientReady", async () => {
            await client.application.commands.set(data);

            Logger.info(`${client.slash.size} Slash commands loaded`);
        });
    } catch (error) {
        Logger.error("Failed to load slash commands:", error);
    }

    try {
        readdirSync("./src/commands/message/").forEach((dir) => {
            const commands = readdirSync(`./src/commands/message/${dir}/`).filter((file) => file.endsWith(".js"));

            for (const file of commands) {
                const command = require(`../commands/message/${dir}/${file}`);

                if (command.name) {
                    client.prefix.set(command.name, command);
                } else {
                    continue;
                }

                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.map((alias) => client.aliases.set(alias, command.name));
                }
            }
        });

        Logger.info(`${client.prefix.size} Prefix commands loaded`);
    } catch (error) {
        Logger.error("Failed to load prefix commands:", error);
    }
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
