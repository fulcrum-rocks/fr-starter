const Directory = require('./Directory');

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
  createStructure() {
    if (this.styleProcessor === 'node-sass') {
      new Directory('scss').createFiles(
        ['_mixins', '_variables', 'main'],
        'scss',
      );
    }
  }
}

module.exports = StyleConfig;
