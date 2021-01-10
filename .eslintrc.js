module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off',
    'no-mixed-operators': 0,
    'vue/max-attributes-per-line': [
      2,
      {
        'singleline': 99,
        'multiline': {
          'max': 199,
          'allowFirstLine': true
        }
      }
    ],
    'vue/attribute-hyphenation': 0,
    'vue/html-self-closing': 0,
    'vue/html-quotes': 0,
    'vue/component-name-in-template-casing': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-unused-components': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/require-prop-types': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/no-parsing-error': 0,
    'vue/html-indent': 0,
    "ignoreComments": 0,
    "skipBlankLines": 0,
    'no-useless-escape': 0,
    'no-trailing-spaces': 0,
    'no-tabs': 0,
    'handle-callback-err': 0,
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
    'semi': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'no-delete-var': 0,
    'no-multiple-empty-lines': [2, { "max": 99999, "maxEOF": 0 }],
    'space-after-keywords': 'never',
    'template-curly-spacing': 'off',
    'indent': 'off',
    'padded-blocks': 0,
    'object-curly-spacing': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
