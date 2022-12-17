const fs = require("fs");
const chalk = require("chalk");

module.exports = (client) => {
  fs.readdirSync("./src/events/").forEach((dir) => {
    const commands = fs.readdirSync(`./src/events/${dir}`).filter((file) => file.endsWith(".js"));

    for (const file of commands) {
      try {
        const pull = require(`../events/${dir}/${file}`);
        if (pull.event && typeof pull.event !== "string") {
          continue;
        }
        pull.event = pull.event || file.replace(".js", "");
        client.poru.on(pull.event, pull.run.bind(null, client));
      } catch (err) {
        console.log(`Error while loading poru event: \n${err}`);
      }
    }
  });

  console.log(
    chalk.white("[") + chalk.green("INFO") + chalk.white("] ") + chalk.green("Poru ") + chalk.white("Events") + chalk.green(" Loaded!")
  );
};
