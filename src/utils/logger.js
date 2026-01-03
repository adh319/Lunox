const chalk = require("chalk");

/**
 * Logger utility for consistent logging across the application
 */
class Logger {
    /**
     * Log an informational message
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments
     */
    static info(message, ...args) {
        console.log(chalk.blue("[INFO]"), message, ...args);
    }

    /**
     * Log a success message
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments
     */
    static success(message, ...args) {
        console.log(chalk.green("[SUCCESS]"), message, ...args);
    }

    /**
     * Log a warning message
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments
     */
    static warn(message, ...args) {
        console.warn(chalk.yellow("[WARN]"), message, ...args);
    }

    /**
     * Log an error message
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments
     */
    static error(message, ...args) {
        console.error(chalk.red("[ERROR]"), message, ...args);
    }

    /**
     * Log a debug message
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments
     */
    static debug(message, ...args) {
        if (process.env.DEBUG === "true") {
            console.log(chalk.gray("[DEBUG]"), message, ...args);
        }
    }

    /**
     * Log an anticrash message
     * @param {string} type - The type of anticrash log
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments
     */
    static anticrash(type, message, ...args) {
        console.error(chalk.red(`[Anticrash] | [${type}] |`), message, ...args);
    }
}

module.exports = Logger;
