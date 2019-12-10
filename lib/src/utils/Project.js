const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { StyleConfig } = require('../cli/cli-plugin-styles/StyleConfig');

const { stylelintrc } = require('../cli/cli-plugin-shared/templates');

const Path = require('./Path');
const Logger = require('./Logger');
const FileSystem = require('./FileSystem');
const Directory = require('./Directory');

/**
 * Class represents an abstract web project
 */
module.exports = class Project {
  /**
   * Setup dependencies and devDependencies
   * @param {string[]} packages package names array
   * @param {Object} options
   * @property {boolean} dev true for devDependencies
   */
  static async installPackages(packages = [], options = {}) {
    await exec(`npm i ${options.dev ? '-D' : ''} ${packages.join(' ')}`);
  }

  /**
   * Extends package.json scripts
   * @param {Object} scripts package.json scripts
   */
  static insertScripts(scripts) {
    const filePath = new Path(Path.pwd());
    try {
      const packageJson = FileSystem.readJson(filePath.join('package.json'));

      packageJson.scripts = {
        ...packageJson.scripts,
        ...scripts,
      };

      FileSystem.writeJson(filePath.join('package.json'), packageJson);
    } catch (err) {
      Logger.error(err.message || 'Scripts are not extended!');
    }
  }

  /**
   * Writes new file with JSON content inside
   * @param {string} fileName full name of the file
   * @param {Object} content file content in key-value pairs format
   */
  static setupToolConfigJSON(fileName, content) {
    const filePath = new Path(Path.pwd());
    try {
      FileSystem.writeJson(filePath.join(fileName), content);
    } catch (err) {
      Logger.error(err.message || `${fileName} is not configured!`);
    }
  }

  static setupIgnoreFile(fileName, paths) {
    try {
      paths.forEach(pathName => {
        fs.appendFileSync(fileName, `${pathName}\n`);
      });
    } catch (err) {
      Logger.error(err.message || `${fileName} is not configured!`);
    }
  }

  static createStructure(directories, files = {}) {
    directories.forEach(dirPath => {
      const dir = new Directory(dirPath);
      if (files[dir]) {
        dir.createFiles(files[dir]);
      }
    });
  }

  static async createStylesStructure(
    styleProcessor = '',
    base = '',
    packages = [],
    devPackages = [],
  ) {
    if (styleProcessor) {
      await this.installPackages([styleProcessor, ...packages]);

      if (devPackages.length > 0) {
        await this.installPackages(
          [...devPackages, ...stylelintrc[styleProcessor].devDependencies],
          { dev: true },
        );
      }
    }

    new StyleConfig(styleProcessor).createStructure(base);
  }
};
