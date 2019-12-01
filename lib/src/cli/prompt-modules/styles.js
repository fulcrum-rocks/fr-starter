module.exports = {
  type: 'list',
  name: 'style',
  message: 'What styling tool do you need?',
  choices: [
    'Sass (SCSS)',
    'styled-components',
    "No one! I'm a CSS software engineer",
  ],
  filter(val) {
    if (val === 'Sass (SCSS)') {
      return 'node-sass';
    }

    if (val === 'styled-components') {
      return val;
    }

    return '';
  },
};
