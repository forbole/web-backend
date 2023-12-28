const paddingLineBetweenStatements = [
  "error",
  { blankLine: "always", next: "return", prev: "*" },
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
        { blankLine: "always", next: "*", prev: item },
        { blankLine: "always", next: item, prev: "*" },
      ])
      .flat(),
  )
  .concat([
    {
      blankLine: "any",
      next: ["singleline-const"],
      prev: ["singleline-const"],
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
  plugins: ["@typescript-eslint", "prettier", "@stylistic", "perfectionist"],
  rules: {
    "@stylistic/padding-line-between-statements": paddingLineBetweenStatements,

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

    "perfectionist/sort-enums": "error",
    "perfectionist/sort-exports": "error",
    "perfectionist/sort-interfaces": "error",
    "perfectionist/sort-object-types": "error",
    "perfectionist/sort-objects": "error",
    "perfectionist/sort-union-types": "error",

    "prefer-const": "error",
    "prefer-destructuring": ["error"],
    "prefer-spread": "error",
    "prefer-template": "error",
    "quote-props": ["error", "consistent-as-needed"],
  },
};
