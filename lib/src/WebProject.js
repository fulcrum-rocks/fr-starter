const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const {
  scripts,
  devDependencies,
  dependencies,
  hooks,
  prettier,
  lintStaged,
  eslint,
  eslintignore,
} = require('./projectConfig');

/**
 * Class represents an abstract web project
 */
class WebProject {
  /**
   * Creates a web project
   * @param {string} base project library/framework base
   * @param {string} title entered project title
   * @param {string} styleProcessor seleted style processor
   */
  constructor(base, title, styleProcessor) {
    this.base = base;
    this.title = title;
    this.styleProcessor = styleProcessor;
  }

  /**
   * Setup dependencies and configuration files
   */
  async installDependencies() {
    await exec('npm i');
    await exec(`npm i -D ${devDependencies[this.base].join(' ')}`);
    await exec(
      `npm i ${dependencies[this.base].join(' ')} ${this.styleProcessor}`,
    );
    WebProject.setupTool('.prettierrc', prettier);
    WebProject.setupTool('.huskyrc.json', hooks[this.base]);
    WebProject.setupTool('.lintstagedrc', lintStaged);
    WebProject.setupEslintignore();
    WebProject.setupTool('.eslintrc', eslint);
    this.extendScripts();
  }

  /**
   * Extends `package.json` scripts section
   */
  extendScripts() {
    try {
      const data = fs.readFileSync('package.json');

      const json = JSON.parse(data.toString());
      json.scripts = {
        ...json.scripts,
        ...scripts[this.base],
      };
      fs.writeFileSync('package.json', JSON.stringify(json, null, '  '));
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Creates configuration file with its content
   * @param {string} fileName new file name
   * @param {Object} json config object
   */
  static setupTool(fileName, json) {
    fs.writeFile(fileName, JSON.stringify(json, null, '  '), err => {
      if (err) {
        throw new Error(err.message || `Error: ${fileName} setup fails!`);
      }
    });
  }

  /**
   * Creates .eslintignore file
   */
  static setupEslintignore() {
    fs.writeFile('.eslintignore', eslintignore, err => {
      if (err) {
        throw new Error(err.message || 'Error: .eslintignore setup fails!');
      }
    });
  }
}

module.exports = WebProject;
