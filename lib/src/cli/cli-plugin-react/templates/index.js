const { FileSystem, Path } = require('../../../utils');

const basePath = new Path(__dirname);

const dependencies = FileSystem.readJson(basePath.join('dependencies.json'));
const devDependencies = FileSystem.readJson(
  basePath.join('devDependencies.json'),
);
const eslint = FileSystem.readJson(basePath.join('eslint.json'));
const husky = FileSystem.readJson(basePath.join('husky.json'));
const lintstaged = FileSystem.readJson(basePath.join('lintstaged.json'));
const scripts = FileSystem.readJson(basePath.join('scripts.json'));

module.exports = {
  dependencies,
  devDependencies,
  eslint,
  husky,
  lintstaged,
  scripts,
};
