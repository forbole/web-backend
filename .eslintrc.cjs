module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["prettier"],
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
    "arrow-body-style": "error",
    "camelcase": "off",
    "global-require": "off",
    "no-shadow": "off",
    "no-unused-vars": "off",
    "object-shorthand": "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "quote-props": ["error", "consistent-as-needed"],

    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-var-requires": "off",

    "jsx-a11y/alt-text": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "jsx-a11y/interactive-supports-focus": "off",
  },
};
