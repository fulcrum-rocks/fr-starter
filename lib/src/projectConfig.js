/**
 * package.json scripts
 */
exports.scripts = {
  react: {
    build: 'cross-env GENERATE_SOURCEMAP=false react-scripts build',
    'lint:js': "eslint --fix . && echo 'Linting is completed.'",
    'lint:css': "echo 'Add some style linting'", // temp
    'test:coverage': 'npm test -- --coverage --watchAll=false',
    prettier: "prettier --write '**/*.{js,jsx}'",
    'pretty-quick': 'pretty-quick',
  },
  gatsby: {},
  next: {},
};

exports.devDependencies = {
  react: [
    'husky',
    'cross-env',
    'prettier',
    'lint-staged',
    'pretty-quick',
    'enzyme',
    'enzyme-adapter-react-16',
    'eslint',
    'eslint-config-airbnb',
    'eslint-config-prettier',
    'eslint-loader',
    'eslint-plugin-import',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-prettier',
    'eslint-plugin-react',
  ],
  gatsby: [],
  next: [],
};

exports.dependencies = {
  react: ['axios', 'react-router-dom'],
  gatsby: [],
  next: [],
};

exports.hooks = {
  react: {
    hooks: {
      'pre-commit': 'npm run build && npm run test:coverage && lint-staged',
    },
  },
  gatsby: {
    hooks: {
      'pre-commit': '',
    },
  },
  next: {
    hooks: {
      'pre-commit': '',
    },
  },
};

exports.prettier = {
  printWidth: 80,
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  trailingComma: 'all',
};

exports.lintStaged = {
  '*.{js,jsx}': [
    'npm run lint:js',
    'npm run lint:css',
    'npm run pretty-quick',
    'git add',
  ],
};

exports.eslintignore = `
build/*.js
config/*.js
src/serviceWorker.js
src/setupTests.js

scripts/*.js
config/**/*.js
`;

exports.eslint = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    'react/destructuring-assignment': 0,
    'no-underscore-dangle': 0,
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    'import/prefer-default-export': 0,
    'no-param-reassign': 1,
    camelcase: 1,
  },
  globals: {
    window: true,
    document: true,
    localStorage: true,
    FormData: true,
    FileReader: true,
    Blob: true,
    navigator: true,
  },
  env: {
    jest: true,
  },
  parser: 'babel-eslint',
};
