const { readdirSync } = require("fs");
const Ascii = require("ascii-table");
const table = new Ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
  readdirSync("./commands/Message/").forEach((dir) => {
    const commands = readdirSync(`./commands/Message/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );

    for (const file of commands) {
      const command = require(`../commands/Message/${dir}/${file}`);

      if (command.name) {
        client.commands.set(command.name, command);
        table.addRow(file, "✅");
      } else {
        table.addRow(
          file,
          `❌ -> Missing a command name, or command name is not a string.`
        );
        continue;
      }

      if (command.aliases && Array.isArray(command.aliases))
        command.aliases.map((alias) => client.aliases.set(alias, command.name));
    }
  });

  console.log(table.toString());
};
