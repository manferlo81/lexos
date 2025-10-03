import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

import pluginJavascript from '@eslint/js'
import pluginStylistic from '@stylistic/eslint-plugin'
import { flatConfigs as pluginImportConfigs } from 'eslint-plugin-import'
import { configs as pluginTypescriptConfigs } from 'typescript-eslint'

// Javascript Plugin

const rulesPluginJavascript = ruleNormalizer()({
  'no-useless-rename': 'error',
  'object-shorthand': 'error',
  'prefer-template': 'error',
  'no-useless-concat': 'error',
  eqeqeq: 'smart',
})

const configPluginJavascript = defineConfig({
  files: ['**/*.{js,mjs,cjs}', '**/*.{ts,mts,cts}'],
  extends: [
    pluginJavascript.configs.recommended,
  ],
  rules: rulesPluginJavascript,
})

// Typescript Plugin

const rulesPluginTypescript = ruleNormalizer({ plugin: '@typescript-eslint' })({
  'array-type': { default: 'array-simple', readonly: 'array-simple' },
  'restrict-template-expressions': {
    allowNumber: true,
    allowBoolean: false,
    allowNullish: false,
    allowRegExp: false,
    allowArray: false,
    allowNever: false,
    allowAny: false,
  },
  'unified-signatures': { ignoreDifferentlyNamedParameters: true },
  'consistent-type-imports': 'error',
})

const configPluginTypescript = defineConfig({
  files: ['**/*.{ts,mts,cts}'],
  languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
  extends: [
    pluginTypescriptConfigs.strictTypeChecked,
    pluginTypescriptConfigs.stylisticTypeChecked,
  ],
  rules: rulesPluginTypescript,
})

// Import Plugin

const rulesPluginImport = ruleNormalizer({ plugin: 'import' })({
  'consistent-type-specifier-style': 'error',
  'no-useless-path-segments': 'error',
  'no-absolute-path': 'error',
  'no-cycle': 'error',
  'no-nodejs-modules': 'error',
})

const configPluginImport = defineConfig({
  files: ['**/*.{js,mjs,cjs}', '**/*.{ts,mts,cts}'],
  languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { 'import/resolver': { typescript: true } },
  extends: [
    pluginImportConfigs.recommended,
    pluginImportConfigs.typescript,
  ],
  rules: rulesPluginImport,
})

// Stylistic Plugin

const rulesPluginStylistic = ruleNormalizer({ plugin: '@stylistic' })({
  indent: 2,
  quotes: 'single',
  'linebreak-style': 'unix',
  'no-extra-parens': 'all',
  'no-extra-semi': 'error',
  'padded-blocks': 'off',
})

const configPluginStylistic = defineConfig({
  files: ['**/*.{js,mjs,cjs}', '**/*.{ts,mts,cts}'],
  extends: [
    pluginStylistic.configs.customize({
      arrowParens: true,
      quoteProps: 'as-needed',
      braceStyle: '1tbs',
      jsx: false,
    }),
  ],
  rules: rulesPluginStylistic,
})

// Config

export default defineConfig(
  globalIgnores(['dist', 'coverage']),
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  configPluginJavascript,
  configPluginTypescript,
  configPluginImport,
  configPluginStylistic,
)

// Helpers

function ruleNormalizer({ severity: defaultSeverity = 'error', plugin: pluginName } = {}) {
  const normalizeRuleEntry = (entry) => {
    if (Array.isArray(entry)) return entry
    if (['error', 'off', 'warn'].includes(entry)) return entry
    return [defaultSeverity, entry]
  }

  const createRuleNormalizer = (normalizeObjectEntry) => {
    return (rules) => {
      const entries = Object.entries(rules)
      const entriesNormalized = entries.map(normalizeObjectEntry)
      return Object.fromEntries(entriesNormalized)
    }
  }

  if (!pluginName) {
    return createRuleNormalizer(
      ([ruleName, ruleEntry]) => [
        ruleName,
        normalizeRuleEntry(ruleEntry),
      ],
    )
  }

  const pluginPrefix = `${pluginName}/`

  const normalizeRuleName = (ruleName) => {
    if (ruleName.startsWith(pluginPrefix)) return ruleName
    return `${pluginPrefix}${ruleName}`
  }

  return createRuleNormalizer(
    ([ruleName, ruleEntry]) => [
      normalizeRuleName(ruleName),
      normalizeRuleEntry(ruleEntry),
    ],
  )
}
