const paddingLineBetweenStatements = [
  "error",
  { blankLine: "always", prev: "*", next: "return" },
]
  .concat(
    [
      "multiline-block-like",
      "multiline-expression",
      "multiline-const",
      "const",
      "type",
      "interface",
      "if",
    ]
      .map((item) => [
        { blankLine: "always", prev: item, next: "*" },
        { blankLine: "always", prev: "*", next: item },
      ])
      .flat(),
  )
  .concat([
    {
      blankLine: "any",
      prev: ["singleline-const"],
      next: ["singleline-const"],
    },
  ]);

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
  plugins: ["@typescript-eslint", "prettier", "@stylistic"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-var-requires": "off",

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

    "@stylistic/padding-line-between-statements": paddingLineBetweenStatements,
  },
};
