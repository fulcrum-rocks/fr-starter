const fs = require('fs');

module.exports = class FileSystem {
  static readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  static writeJson(filePath, object) {
    fs.writeFileSync(filePath, JSON.stringify(object, null, 2));
  }
};
