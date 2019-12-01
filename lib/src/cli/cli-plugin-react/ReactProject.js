const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const shell = require('shelljs');

const { Project, Git, Logger, Path } = require('../../utils');
const {
  dependencies,
  devDependencies,
  eslint,
  husky,
  lintstaged,
  scripts,
} = require('./templates');
const { prettier, eslintignore } = require('../cli-plugin-shared/templates');

/**
 * React project basic folder structure
 */
const DIRECTORIES = [
  'src/components',
  'src/components/shared',
  'src/context',
  'src/services',
  'src/services/api',
  'src/utils',
];

/**
 * Class represents project created with create-react-app
 */
class ReactProject extends Project {
  /**
   * Creates new react project
   * @param {string} title project title
   * @param {string} styleProcessor style processor
   */
  constructor(title, styleProcessor) {
    super();
    this.title = title;
    this.styleProcessor = styleProcessor;
  }

  /**
   * Clears node modules
   */
  static clear() {
    try {
      const fullpath = new Path(Path.pwd());
      fs.rmdirSync(fullpath.join('node_modules'), { recursive: true });
      fs.unlinkSync(fullpath.join('yarn.lock'));
    } catch (err) {
      Logger.error(err.message || 'Project was not cleared!');
    }
  }

  /**
   * Initialize a new project
   */
  async init() {
    const { stderr } = await exec(`npx create-react-app ${this.title}`);
    shell.cd(this.title);

    ReactProject.clear();
    await Project.installPackages();
    await Project.installPackages(dependencies);
    await Project.installPackages(devDependencies, { dev: true });

    Project.insertScripts(scripts);

    Project.setupToolConfigJSON('.eslintrc', eslint);
    Project.setupToolConfigJSON('.huskyrc.json', husky);
    Project.setupToolConfigJSON('.lintstagedrc', lintstaged);
    Project.setupToolConfigJSON('.prettierrc', prettier);
    Project.setupIgnoreFile('.eslintignore', eslintignore);

    await this.createStructure();

    Git.recommit();

    if (stderr) {
      Logger.error(stderr);
    }
  }

  /**
   * Creates project structure
   */
  async createStructure() {
    Project.createStructure(DIRECTORIES);
    await Project.createStylesStructure(this.styleProcessor);
  }
}

module.exports = ReactProject;
