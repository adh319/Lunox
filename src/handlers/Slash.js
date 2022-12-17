const { readdirSync } = require("node:fs");
const path = require("node:path");
const chalk = require("chalk");

module.exports = (client) => {
  const data = [];

  readdirSync("./src/commands/Slash/").forEach((dir) => {
    const commands = readdirSync(`./src/commands/Slash/${dir}/`).filter((file) => file.endsWith(".js"));

    for (const file of commands) {
      const pull = require(path.join(__dirname, `../commands/Slash/${dir}/${file}`));

      if (pull.name) {
        client.slashCommands.set(pull.name, pull);
        data.push(pull);
      } else {
        continue;
      }
    }
  });

  client.on("ready", async () => {
    await client.application.commands.set(data);
    console.log(
      chalk.white("[") +
        chalk.green("INFO") +
        chalk.white("] ") +
        chalk.green(`${client.slashCommands.size} `) +
        chalk.white("SlashCommands") +
        chalk.green(" Loaded!")
    );
  });
};
