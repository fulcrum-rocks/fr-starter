const inquirer = require('inquirer');
const { Spinner } = require('cli-spinner');
const emoji = require('node-emoji');

const ReactProject = require('../ReactProject');

const questions = [
  {
    type: 'list',
    name: 'base',
    message: 'What base do you wanna use?',
    choices: ['React.js', 'Gatsby.js', 'Next.js'],
    filter(val) {
      return val.replace('.js', '').toLowerCase();
    },
  },
  {
    type: 'list',
    name: 'style',
    message: 'What styling tool do you need?',
    choices: [
      'node-sass',
      'styled-components',
      `No one! I'm a CSS software engineer ${emoji.get('sunglasses')}`,
    ],
    filter(val) {
      if (val !== 'node-sass' && val !== 'styled-components') return '';

      return val.toLowerCase();
    },
  },
  {
    type: 'input',
    name: 'title',
    message: "Enter your project's directory name",
    validate(value) {
      if (value && value.trim()) {
        return true;
      }

      return "Please enter project's directory name";
    },
  },
];

const spinner = new Spinner('Processing, please wait... %s');
spinner.setSpinnerString('|/-\\');

/**
 * Class represents CLI dialog
 */
class Prompt {
  /**
   * Starts a dialog
   */
  start() {
    inquirer.prompt(questions).then(this.handleAnswers);
  }

  /**
   * Handles given answers
   * @param {Object} answers
   * @property {string} base project base
   * @property {string} title project title
   * @property {string} style project style processor
   */
  async handleAnswers({ base, style, title }) {
    spinner.start();

    let app;

    switch (base) {
      case 'react':
        app = new ReactProject(title, style);
        await app.init();
        break;
      case 'gatsby':
        console.log('Gatsby');
        break;
      case 'next':
        console.log('Next');
        break;
      default:
        console.log('select');
    }

    spinner.stop();
  }
}

module.exports = new Prompt();
