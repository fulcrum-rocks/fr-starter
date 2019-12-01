const path = require('path');

module.exports = function absolutePath(pathName) {
  return path.join(__dirname, '..', ...pathName.split('/'));
};
