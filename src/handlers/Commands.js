const { readdirSync } = require("fs");
const chalk = require("chalk");

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

	console.log(
		chalk.white("[") +
			chalk.green("INFO") +
			chalk.white("] ") +
			chalk.green(`${client.commands.size} `) +
			chalk.white("MessageCommands") +
			chalk.green(" Loaded!")
	);
};
