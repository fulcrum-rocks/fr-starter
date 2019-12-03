const fs = require('fs');
// const shell = require('shelljs');

/**
 * Class represents single diectory
 */
class Directory {
  /**
   * Creates new directory
   * @param {string} name directory name
   */
  constructor(name) {
    this.name = name;

    const dir = `./${this.name}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(this.name);
    }
    // shell.mkdir(this.name);
  }

  /**
   * Creates empty files
   * @param {string[]} names file names array
   * @param {string} extention file extention
   */
  createFiles(names, extention = '') {
    names.forEach(fileName => {
      fs.writeFile(
        `${this.name}/${fileName}${extention ? `.${extention}` : ''}`,
        '',
        err => {
          if (err) console.log(err);
        },
      );
    });
  }
}

module.exports = Directory;
