const { FileSystem, Path } = require('../../../utils');

const basePath = new Path(__dirname);

const eslintignore = FileSystem.readJson(basePath.join('eslintignore.json'));
const prettier = FileSystem.readJson(basePath.join('prettier.json'));

module.exports = { eslintignore, prettier };
