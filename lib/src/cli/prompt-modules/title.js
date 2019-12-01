module.exports = {
  type: 'input',
  name: 'title',
  message: "Enter your project's directory name",
  validate(value) {
    if (value && value.trim()) {
      return true;
    }

    return "Please enter project's directory name";
  },
};
