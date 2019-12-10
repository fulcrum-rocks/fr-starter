const Directory = require('../../utils/Directory');
const Path = require('../../utils/Path');

/**
 * Class represents project styles configuration
 */
class StyleConfig {
  /**
   * Creates style config
   * @param {string} styleProcessor selected style processor
   */
  constructor(styleProcessor) {
    this.styleProcessor = styleProcessor;
  }

  /**
   * Creates folder/file structure
   */
  createStructure(base = '') {
    if (this.styleProcessor === 'node-sass') {
      const fullpath = new Path(Path.pwd());
      new Directory(
        fullpath.join([`${base === 'react' ? 'src' : 'client'}`, 'scss']),
      ).createFiles(['_mixins', '_variables', 'main'], 'scss');
    }
  }
}

module.exports = { StyleConfig };
