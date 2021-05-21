module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'plugin:prettier/recommended', 'eslint:recommended'],
  globals: {
    $: false,
    Zepto: false,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'no-console': 0,
    indent: ['error', 2, {
      SwitchCase: 1
    }],
    'linebreak-style': ['off', 'windows'],
    quotes: ['error', 'single'],
  },
};
