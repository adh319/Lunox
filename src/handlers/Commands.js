const { readdirSync } = require("fs");

module.exports = (client) => {
    readdirSync("./src/commands/Message/").forEach((dir) => {
        const commands = readdirSync(`./src/commands/Message/${dir}/`).filter((file) => file.endsWith(".js"));

        for (const file of commands) {
            const command = require(`../commands/Message/${dir}/${file}`);

            if (command.name) {
                client.commands.set(command.name, command);
            } else {
                continue;
            }

            if (command.aliases && Array.isArray(command.aliases)) command.aliases.map((alias) => client.aliases.set(alias, command.name));
        }
    });

    console.log(`[INFO] ${client.commands.size} Prefix Commands Loaded!`);
};
