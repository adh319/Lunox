const { readdirSync } = require("node:fs");
const path = require("node:path");

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

            console.log(`[INFO] ${client.slash.size} Slash commands loaded`);
        });
    } catch (error) {
        console.error(error);
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

        console.log(`[INFO] ${client.prefix.size} Prefix commands loaded`);
    } catch (error) {
        console.error(error);
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
