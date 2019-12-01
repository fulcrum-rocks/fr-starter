const util = require('util');
const exec = util.promisify(require('child_process').exec);
const shell = require('shelljs');

const WebProject = require('./WebProject');
const StyleConfig = require('./StyleConfig');

const Git = require('./services/Git');

/**
 * React project basic folder structure
 */
const DIRECTORIES = [
  'components',
  'components/shared',
  'context',
  'services',
  'utils',
];

/**
 * Class represents project created with create-react-app
 */
class ReactProject extends WebProject {
  /**
   * Creates new react project
   * @param {string} title project title
   * @param {string} styleProcessor style processor
   */
  constructor(title, styleProcessor) {
    super('react', title, styleProcessor);
  }

  /**
   * Clears node modules
   */
  static clear() {
    shell.rm('-rf', ['./node_modules/', './yarn.lock']);
  }

  /**
   * Initialize a new project
   */
  async init() {
    const { stderr } = await exec(`npx create-react-app ${this.title}`);
    shell.cd(`${this.title}`);

    ReactProject.clear();
    await this.installDependencies();
    this.createStructure();

    if (stderr) {
      console.log(stderr);
    }
  }

  /**
   * Creates project structure
   */
  createStructure() {
    shell.cd('src');

    DIRECTORIES.forEach(dirName => {
      shell.mkdir(dirName);
    });

    new StyleConfig(this.styleProcessor).createStructure();

    shell.cd('..');
    Git.recommit();
  }
}

module.exports = ReactProject;
