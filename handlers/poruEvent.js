const { readdirSync } = require('fs');
const Ascii = require('ascii-table');
const table = new Ascii('Poru Events');
table.setHeading('Events', 'Load status');

module.exports = (client) => {
  const commands = readdirSync(
    __dirname.replace('handlers', 'poruEvents'),
  ).filter((file) => file.endsWith('.js'));

  for (const file of commands) {
    try {
      const pull = require(`${__dirname.replace(
        'handlers',
        'poruEvents',
      )}/${file}`);

      if (pull.event && typeof pull.event !== 'string') {
        table.addRow(file, `❌ -> Property event should be string.`);
        continue;
      }

      pull.event = pull.event || file.replace('.js', '');

      client.poru.on(pull.event, pull.run.bind(null, client));

      table.addRow(file, '✅');
    } catch (err) {
      console.log(`Error while loading poru event: \n${err}`);
      table.addRow(file, `❌ -> Error while loading event`);
    }
  }

  console.log(table.toString());
};
