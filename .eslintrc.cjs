module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-refresh",
    "react-hooks",
    "react-compiler",
    "eslint-plugin-react-compiler",
    "prettier",
  ],
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "postcss.config.cjs",
    "src/__test__/",
    "coverage/",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  rules: {
    "quotes": ['error', 'single', { 'avoidEscape': true }],
    "@typescript-eslint/no-explicit-any": "error",
    "react-compiler/react-compiler": "error",
    "prettier/prettier": ['error', {
      'singleQuote': true,
      'jsxSingleQuote': true
    }],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-void": ["error", { allowAsStatement: true }],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-param-reassign": ["error", { props: false }],
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "import/no-absolute-path": "off",
    "import/extensions": "off",
    "react/require-default-props": "off",
    "react/prefer-stateless-function": "off",
    "react/button-has-type": "off",
    curly: ["error", "all"],
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "explicit",
        overrides: {
          constructors: "off",
        },
      },
    ],
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          arguments: false,
          returns: false,
        },
      },
    ],
  },
  overrides: [
    {
      files: ["*.js"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
    },
  ],
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["", "./public"],
          ["@", "./src"],
        ],
        extensions: [".js", ".tsx", ".ts", ".json"],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    react: {
      version: "detect",
    },
  },
  noInlineConfig: true,
};
