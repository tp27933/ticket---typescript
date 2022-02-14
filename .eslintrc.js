module.exports = {
  root: true,
  parserOptions: {
    "parse": "babel-eslint",
    sourceType: 'module',
    requireConfigFile: false,
    ecmaVersion: 2018
  },
  "parser": "vue-eslint-parser",
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  "extends": ["plugin:vue/vue3-essential", 'plugin:vue/vue3-strongly-recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'no-console': 'off',
    "globals":
    {
      "document": true,
      "localStorage": true,
      "window": true
    }
  }
}