module.exports = {
  type: 'list',
  name: 'base',
  message: 'What base do you wanna use?',
  choices: ['React.js', 'Next.js'],
  filter(val) {
    return val
      .trim()
      .replace('.js', '')
      .toLowerCase();
  },
};
