const config = require("../settings/config.js");
const { EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = async (client) => {
  process.on("beforeExit", (code) => {
    console.log(chalk.yellow.dim("[AntiCrash] | [BeforeExit_Logs] | [Start] : ==============="));
    console.log(code);
    console.log(chalk.yellow("[AntiCrash] | [BeforeExit_Logs] | [End] : ==============="));
  });

  process.on("exit", (error) => {
    console.log(chalk.yellow("[AntiCrash] | [Exit_Logs] | [Start]  : ==============="));
    console.log(error);
    console.log(chalk.yellow("[AntiCrash] | [Exit_Logs] | [End] : ==============="));
  });

  process.on("unhandledRejection", async (reason, promise) => {
    console.log(chalk.yellow("[AntiCrash] | [UnhandledRejection_Logs] | [start] : ==============="));
    console.log(reason);
    console.log(chalk.yellow("[AntiCrash] | [UnhandledRejection_Logs] | [end] : ==============="));

    let errorLogsChannel = client.channels.cache.get(config.errorLogs);
    if (!errorLogsChannel) errorLogsChannel = await client.channels.fetch(config.errorLogs);
    const errEmbed = new EmbedBuilder()
      .setColor(client.color)
      .setTitle(`An error was occured with "unhandledRejection":`)
      .setDescription(`\`\`\`${reason}\`\`\``)
      .setTimestamp();

    if (errorLogsChannel) {
      await errorLogsChannel.send({ embeds: [errEmbed] });
    }
  });

  process.on("rejectionHandled", (promise) => {
    console.log(chalk.yellow("[AntiCrash] | [RejectionHandled_Logs] | [Start] : ==============="));
    console.log(promise);
    console.log(chalk.yellow("[AntiCrash] | [RejectionHandled_Logs] | [End] : ==============="));
  });

  process.on("uncaughtException", async (err, origin) => {
    console.log(chalk.yellow("[AntiCrash] | [UncaughtException_Logs] | [Start] : ==============="));
    console.log(err);
    console.log(chalk.yellow("[AntiCrash] | [UncaughtException_Logs] | [End] : ==============="));

    let errorLogsChannel = client.channels.cache.get(config.errorLogs);
    if (!errorLogsChannel) errorLogsChannel = await client.channels.fetch(config.errorLogs);
    const errEmbed = new EmbedBuilder()
      .setColor(client.color)
      .setTitle(`An error was occured with "uncaughtException":`)
      .setDescription(`\`\`\`${err}\`\`\``)
      .setTimestamp();

    if (errorLogsChannel) {
      await errorLogsChannel.send({ embeds: [errEmbed] });
    }
  });

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(chalk.yellow("[AntiCrash] | [UncaughtExceptionMonitor_Logs] | [Start] : ==============="));
    console.log(err);
    console.log(chalk.yellow("[AntiCrash] | [UncaughtExceptionMonitor_Logs] | [End] : ==============="));
  });

  process.on("warning", (warning) => {
    console.log(chalk.yellow("[AntiCrash] | [Warning_Logs] | [Start] : ==============="));
    console.log(warning);
    console.log(chalk.yellow("[AntiCrash] | [Warning_Logs] | [End] : ==============="));
  });

  //process.on("SIGINT", () => {
  //console.log(chalk.yellow("☆・[AntiCrash] | [SIGINT]・☆"));
  //});

  console.log(
    chalk.white("[") +
      chalk.green("INFO") +
      chalk.white("] ") +
      chalk.green("ErrorHandler ") +
      chalk.white("Events") +
      chalk.green(" Loaded!")
  );
};
