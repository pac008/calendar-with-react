module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard',
    'eslint-config-prettier',
  ],
  overrides: [
    {
      files: ["*.test.*", "jest.setup.js"],
      env: {
        jest: true
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {},
};
