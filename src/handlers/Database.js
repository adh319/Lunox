const chalk = require("chalk");

module.exports = (client) => {
    require("./database/LoadDatabase.js")(client);
    console.log(
        chalk.white("[") +
            chalk.green("INFO") +
            chalk.white("] ") +
            chalk.green("Database ") +
            chalk.white("Events") +
            chalk.green(" Loaded!")
    );
};
