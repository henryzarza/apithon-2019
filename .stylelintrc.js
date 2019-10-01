module.exports = {
  extends: ['stylelint-config-wolox'],
  rules: {
    'selector-max-type': 2,
    'at-rule-no-unknown': [true, {
      ignoreAtRules: ['if', 'for', 'extend', 'mixin']
    }],
    'scss/no-duplicate-dollar-variables': [true, {
      ignoreInsideAtRules: ['if', 'mixin', 'media']
    }],
    "block-closing-brace-empty-line-before": null,
    "block-closing-brace-newline-after": null,
    "block-closing-brace-newline-before": null,
    "block-closing-brace-space-before": null,
    "block-opening-brace-newline-after": null,
    "block-opening-brace-space-after": null,
    "block-opening-brace-space-before": null,
    "declaration-block-semicolon-newline-after": null,
    "declaration-block-semicolon-space-after": null,
    "declaration-block-semicolon-space-before": null,
    "declaration-block-trailing-semicolon": null,
    "declaration-property-unit-whitelist": null,
    "selector-class-pattern": null,
    "selector-pseudo-class-no-unknown": [true, {
      ignorePseudoClasses: ['global']
    }],
  }
};
