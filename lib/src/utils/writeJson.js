const fs = require('fs');

module.exports = function writeJson(fileName, object) {
  fs.writeFileSync(fileName, JSON.stringify(object, null, 2));
};
