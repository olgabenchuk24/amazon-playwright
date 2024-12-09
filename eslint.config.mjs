import globals from "globals";
import pluginJs from "@eslint/js";
import playwright from "eslint-plugin-playwright";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.node } },
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**", "playwright-report/**", "test-results/**"],
    rules: { ...pluginJs.configs.recommended.rules },
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["tests/**"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
    },
  },
];
