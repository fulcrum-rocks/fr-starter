const { Spinner } = require('cli-spinner');
const emoji = require('node-emoji');

const spinner = new Spinner('Processing, please wait... %s');
spinner.setSpinnerString('|/-\\');

exports.spinner = spinner;

exports.getEmoji = name => emoji.get(name || 'man-facepalming');
