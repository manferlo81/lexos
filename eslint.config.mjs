import pluginJavascript from '@eslint/js'
import pluginStylistic from '@stylistic/eslint-plugin'
import pluginImportX from 'eslint-plugin-import-x'
import globals from 'globals'
import { config, configs as typescriptConfigs } from 'typescript-eslint'

const javascriptPluginConfig = config(
  pluginJavascript.configs.recommended,
  normalizeRulesConfig({
    'no-useless-rename': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'no-useless-concat': 'error',
    eqeqeq: 'smart',
  }),
)

const importPluginConfig = config(
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  normalizeRulesConfig('import-x', {
    'consistent-type-specifier-style': 'error',
    'no-useless-path-segments': 'error',
    'no-absolute-path': 'error',
    'no-cycle': 'error',
    'no-nodejs-modules': 'error',
  }),
  {
    ...normalizeRulesConfig('import-x', { 'no-named-as-default-member': 'off' }),
    files: ['eslint.config.mjs'],
  },
)

const stylisticPluginConfig = config(
  pluginStylistic.configs.customize({
    indent: 2,
    semi: false,
    arrowParens: true,
    quoteProps: 'as-needed',
    braceStyle: '1tbs',
  }),
  normalizeRulesConfig('@stylistic', {
    quotes: 'single',
    'linebreak-style': 'unix',
    'no-extra-parens': 'all',
    'no-extra-semi': 'error',
    'padded-blocks': 'off',
  }),
)

const typescriptPluginConfig = config(
  typescriptConfigs.strictTypeChecked,
  typescriptConfigs.stylisticTypeChecked,
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } } },
  normalizeRulesConfig('@typescript-eslint', {
    'array-type': { default: 'array-simple', readonly: 'array-simple' },
    'unified-signatures': { ignoreDifferentlyNamedParameters: true },
    'restrict-template-expressions': {
      allowAny: false,
      allowBoolean: false,
      allowNever: false,
      allowNullish: false,
      allowRegExp: false,
    },
  }),
  {
    ...typescriptConfigs.disableTypeChecked,
    files: ['**/*.{js,mjs,cjs}'],
  },
)

export default config(
  { ignores: ['dist', 'coverage'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  javascriptPluginConfig,
  importPluginConfig,
  stylisticPluginConfig,
  typescriptPluginConfig,
)

function normalizeRulesConfig(pluginName, rules) {
  if (!rules && pluginName) return normalizeRulesConfig(null, pluginName)
  const entries = Object.entries(rules)
  if (!entries.length) return {}
  const normalizeEntry = createEntryNormalizer(pluginName)
  const entriesNormalized = entries.map(normalizeEntry)
  const rulesNormalized = Object.fromEntries(entriesNormalized)
  return { rules: rulesNormalized }
}

function createEntryNormalizer(pluginName) {
  if (!pluginName) return ([ruleName, ruleEntry]) => [ruleName, normalizeRuleEntry(ruleEntry)]
  const normalizeRuleName = createRuleNameNormalizer(pluginName)
  return ([ruleName, ruleEntry]) => [normalizeRuleName(ruleName), normalizeRuleEntry(ruleEntry)]
}

function createRuleNameNormalizer(pluginName) {
  const pluginPrefix = `${pluginName}/`
  return (ruleName) => {
    if (ruleName.startsWith(pluginPrefix)) return ruleName
    return `${pluginPrefix}${ruleName}`
  }
}

function normalizeRuleEntry(entry) {
  if (Array.isArray(entry)) return entry
  if (['error', 'off', 'warn'].includes(entry)) return entry
  return ['error', entry]
}
