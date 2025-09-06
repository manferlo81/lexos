import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

import pluginJavascript from '@eslint/js'
import pluginStylistic from '@stylistic/eslint-plugin'
import { flatConfigs as pluginImportConfigs } from 'eslint-plugin-import-x'
import { configs as pluginTypescriptConfigs } from 'typescript-eslint'

// Javascript Plugin

const rulesPluginJavascript = normalizeRules(null, {
  'no-useless-rename': 'error',
  'object-shorthand': 'error',
  'prefer-template': 'error',
  'no-useless-concat': 'error',
  eqeqeq: 'smart',
})

const configPluginJavascript = defineConfig(
  pluginJavascript.configs.recommended,
  { rules: rulesPluginJavascript },
)

// Import Plugin

const rulesPluginImport = normalizeRules('import-x', {
  'consistent-type-specifier-style': 'error',
  'no-useless-path-segments': 'error',
  'no-absolute-path': 'error',
  'no-cycle': 'error',
  'no-nodejs-modules': 'error',
})

const configPluginImport = defineConfig(
  pluginImportConfigs.recommended,
  pluginImportConfigs.typescript,
  { rules: rulesPluginImport },
)

// Stylistic Plugin

const rulesPluginStylistic = normalizeRules('@stylistic', {
  quotes: 'single',
  'linebreak-style': 'unix',
  'no-extra-parens': 'all',
  'no-extra-semi': 'error',
  'padded-blocks': 'off',
})

const configPluginStylistic = defineConfig(
  pluginStylistic.configs.customize({
    quotes: 'single',
    indent: 2,
    semi: false,
    arrowParens: true,
    quoteProps: 'as-needed',
    braceStyle: '1tbs',
    commaDangle: 'always-multiline',
    blockSpacing: true,
    jsx: false,
  }),
  { rules: rulesPluginStylistic },
)

// Typescript Plugin

const rulesPluginTypescript = normalizeRules('@typescript-eslint', {
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

const configPluginTypescript = defineConfig(
  pluginTypescriptConfigs.strictTypeChecked,
  pluginTypescriptConfigs.stylisticTypeChecked,
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } } },
  { rules: rulesPluginTypescript },
)

const configDisableJavascriptTypeCheck = {
  ...pluginTypescriptConfigs.disableTypeChecked,
  files: ['**/*.{js,mjs,cjs}'],
}

// Config

export default defineConfig(
  globalIgnores(['dist', 'coverage']),
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  configPluginJavascript,
  configPluginImport,
  configPluginStylistic,
  configPluginTypescript,
  configDisableJavascriptTypeCheck,
)

// Helpers

function normalizeRuleEntry(entry) {
  if (Array.isArray(entry)) return entry
  if (['error', 'off', 'warn'].includes(entry)) return entry
  return ['error', entry]
}

function createRuleNameNormalizer(pluginName) {
  const pluginPrefix = `${pluginName}/`
  return (ruleName) => {
    if (ruleName.startsWith(pluginPrefix)) return ruleName
    return `${pluginPrefix}${ruleName}`
  }
}

function createObjectEntryNormalizer(pluginName) {
  if (!pluginName) return ([ruleName, ruleEntry]) => [ruleName, normalizeRuleEntry(ruleEntry)]
  const normalizeRuleName = createRuleNameNormalizer(pluginName)
  return ([ruleName, ruleEntry]) => [normalizeRuleName(ruleName), normalizeRuleEntry(ruleEntry)]
}

function normalizeRules(pluginName, rules) {
  const entries = Object.entries(rules)
  const normalizeObjectEntry = createObjectEntryNormalizer(pluginName)
  const entriesNormalized = entries.map(normalizeObjectEntry)
  return Object.fromEntries(entriesNormalized)
}
