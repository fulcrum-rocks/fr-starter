const util = require('util');
const exec = util.promisify(require('child_process').exec);

const shell = require('shelljs');

const Directory = require('../../utils/Directory');
const Project = require('../../utils/Project');
const Git = require('../../utils/Git');
const Logger = require('../../utils/Logger');
const Path = require('../../utils/Path');

const {
  babelrc,
  gitignore,
  eslintignore,
  prettierignore,
  dependencies,
  devDependencies,
  eslint,
  husky,
  lintstaged,
  scripts,
  styleDevDependencies,
} = require('./templates');
const { prettier } = require('../cli-plugin-shared/templates');

/**
 * React project basic folder structure
 */
const DIRECTORIES = [
  'server',
  'client',
  'client/components',
  'client/context',
  'client/api',
  'client/utils',
  'helpers',
  'pages',
  'public',
  'public/static',
  'public/static/fonts',
  'public/static/images',
];

/**
 * Class represents project created with nextjs
 */
class NextProject extends Project {
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
   * Initialize a new project
   */
  async init() {
    const fullpath = new Path(Path.pwd());
    /* eslint-disable-next-line no-new */
    new Directory(fullpath.join(this.title));
    shell.cd(this.title);
    const { stderr } = await exec('npm init -y');

    await Project.installPackages(dependencies);
    await Project.installPackages(devDependencies, { dev: true });

    Project.insertScripts(scripts);

    Project.setupToolConfigJSON('.eslintrc', eslint);
    Project.setupToolConfigJSON('.babelrc', babelrc);
    Project.setupIgnoreFile('.eslintignore', eslintignore);
    Project.setupToolConfigJSON('.huskyrc.json', husky);
    Project.setupToolConfigJSON('.lintstagedrc', lintstaged);
    Project.setupToolConfigJSON('.prettierrc', prettier);
    Project.setupIgnoreFile('.prettierignore', prettierignore);
    Project.setupIgnoreFile('.gitignore', gitignore);

    await this.createStructure();

    Git.init();

    if (stderr) {
      Logger.error(stderr);
    }
  }

  /**
   * Creates project structure
   */
  async createStructure() {
    Project.createStructure(DIRECTORIES);
    await Project.createStylesStructure(
      this.styleProcessor,
      'next',
      [],
      styleDevDependencies[this.styleProcessor],
    );
  }
}

module.exports = NextProject;
