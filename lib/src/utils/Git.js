const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * Class represents git cli helper
 */
class Git {
  /**
   * Runs git init and makes first commit
   */
  static async init() {
    await exec('git init && git add . && git commit -m "initial commit"');
  }

  /**
   * Rewrites default commit
   */
  static async recommit() {
    await exec('git add . && git commit --amend -m "initial commit"');
  }

  /**
   * Creates common branches
   */
  static async createDefaultBranches() {
    await exec('git checkout -b develop');
  }
}

module.exports = Git;
