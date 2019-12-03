const fs = require('fs');

module.exports = function requireJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};
