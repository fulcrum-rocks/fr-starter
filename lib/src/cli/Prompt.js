const inquirer = require('inquirer');

const { spinner } = require('./cli-ui');
const { base, styles, title } = require('./prompt-modules');

const { ReactProject } = require('./cli-plugin-react');
const { NextProject } = require('./cli-plugin-next');

const questions = [base, styles, title];

/**
 * Class represents CLI dialog
 */
class Prompt {
  /**
   * Handles given answers
   * @param {Object} answers
   * @property {string} base project base
   * @property {string} title project title
   * @property {string} style project style processor
   */
  static async handleAnswers(answers) {
    spinner.start();

    let app;

    switch (answers.base) {
      case 'react':
        app = new ReactProject(answers.title, answers.style);
        await app.init();
        break;

      case 'next':
        app = new NextProject(answers.title, answers.style);
        await app.init();
        break;

      default:
        console.log('Gatsby');
    }

    spinner.stop();
  }

  /**
   * Starts a dialog
   */
  static start() {
    inquirer.prompt(questions).then(this.handleAnswers);
  }
}

module.exports = { Prompt };
