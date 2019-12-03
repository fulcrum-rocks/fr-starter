const path = require('path');

const shell = require('shelljs');

module.exports = class Path {
  constructor(dirName) {
    this.dirName = dirName;
  }

  join(pathParts) {
    if (Array.isArray(pathParts)) return path.join(this.dirName, ...pathParts);

    return path.join(this.dirName, pathParts);
  }

  static pwd() {
    return shell.pwd().stdout;
  }
};
