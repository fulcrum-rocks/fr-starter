const FileSystem = require('../../../utils/FileSystem');
const Path = require('../../../utils/Path');

const basePath = new Path(__dirname);

const babelrc = FileSystem.readJson(basePath.join('babelrc.json'));
const dependencies = FileSystem.readJson(basePath.join('dependencies.json'));
const devDependencies = FileSystem.readJson(
  basePath.join('devDependencies.json'),
);
const eslint = FileSystem.readJson(basePath.join('eslint.json'));
const eslintignore = FileSystem.readJson(basePath.join('eslintignore.json'));
const gitignore = FileSystem.readJson(basePath.join('gitignore.json'));
const husky = FileSystem.readJson(basePath.join('husky.json'));
const lintstaged = FileSystem.readJson(basePath.join('lintstaged.json'));
const prettierignore = FileSystem.readJson(
  basePath.join('prettierignore.json'),
);
const scripts = FileSystem.readJson(basePath.join('scripts.json'));
const styleDevDependencies = FileSystem.readJson(
  basePath.join('styleDevDependencies.json'),
);

module.exports = {
  babelrc,
  eslintignore,
  prettierignore,
  gitignore,
  dependencies,
  devDependencies,
  eslint,
  husky,
  lintstaged,
  scripts,
  styleDevDependencies,
};
