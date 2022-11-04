const { readdirSync } = require('node:fs');
const path = require('node:path');
const Ascii = require('ascii-table');
const table = new Ascii('Slash commands');

module.exports = (client) => {
  const data = [];

  readdirSync('./commands/Slash/').forEach((dir) => {
    const commands = readdirSync(`./commands/Slash/${dir}/`).filter((file) =>
      file.endsWith('.js'),
    );

    for (const file of commands) {
      const pull = require(path.join(
        __dirname,
        `../commands/Slash/${dir}/${file}`,
      ));

      if (pull.name) {
        client.slashCommands.set(pull.name, pull);
        data.push(pull);
        table.addRow(file, '✅');
      } else {
        table.addRow(
          file,
          `❌  -> missing a help.name, or help.name is not a string.`,
        );
        continue;
      }
    }
  });

  console.log(table.toString());

  client.on('ready', async () => {
    await client.application.commands.set(data);
    console.log('Registered slash commands.');
  });
};
