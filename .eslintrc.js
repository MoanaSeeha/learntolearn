const clientESLintConfig = require('./config/eslint');

module.exports = Object.assign({}, clientESLintConfig, {
  env: Object.assign({}, clientESLintConfig.env, {
    node: true,
  }),
/*
  "react": {
    "version": "detect", // React version. "detect" automatically picks the version you have installed.
  },
 */
  //"ignorePatterns": ["/data/quiz-*"],
  // "rules": {
  //   "eqeqeq": "off",
  //   "curly": "error",
  //   "no-unused-vars": "off",
  // },
  plugins: ["jsx-a11y"],
  // rules: { // all kinds of shit comes up
  //   "no-unused-vars": "off",
  // "quotes": ["error", "double"]
  //   "jsx-a11y/anchor-is-valid": "off",
  //   "jsx-a11y/anchor-has-content": "off"
  // }
});
