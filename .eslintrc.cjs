module.exports = {
  env: {
    es2021: true,
  },
  extends: ["prettier", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-var-requires": "off",

    // @TODO: Enable it again when ready
    "@typescript-eslint/no-explicit-any": "off",

    "arrow-body-style": "error",
    "eqeqeq": "error",
    "no-else-return": "error",
    "no-nested-ternary": "error",
    "no-shadow": "off",
    "no-useless-return": "error",
    "object-shorthand": "error",
    "operator-assignment": "error",
    "prefer-const": "error",
    "prefer-destructuring": ["error"],
    "prefer-spread": "error",
    "prefer-template": "error",
    "quote-props": ["error", "consistent-as-needed"],

    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
    ],

    "jsx-a11y/alt-text": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "jsx-a11y/interactive-supports-focus": "off",
  },
};
