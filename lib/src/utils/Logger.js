const chalk = require('chalk');

module.exports = class Logger {
  static error(err) {
    console.log(chalk.bgRed(err));
  }

  static success(text) {
    console.log(chalk.bgGreen(text));
  }
};
