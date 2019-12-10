const FileSystem = require('../../../utils/FileSystem');
const Path = require('../../../utils/Path');

const basePath = new Path(__dirname);

const eslintignore = FileSystem.readJson(basePath.join('eslintignore.json'));
const prettier = FileSystem.readJson(basePath.join('prettier.json'));
const stylelintrc = FileSystem.readJson(basePath.join('stylelintrc.json'));

module.exports = { eslintignore, prettier, stylelintrc };
