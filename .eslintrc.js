module.exports = {
  "extends": [
    "@react-native-community",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint"
  ],
  "rules": {
    "sort-imports": [
      "error",
      {
        "ignoreCase": false,
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": [
          "none",
          "all",
          "multiple",
          "single"
        ]
      }
    ],
    "no-var": "error",
    "no-console": "warn",
    "max-len": [
      "error",
      {
        "code": 120,
        "ignoreUrls": true,
        "ignorePattern": "^import [^,]+ from"
      }
    ],
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/array-type": "warn",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/ban-types": [
      "error",
      {
        "types": {
          "Function": false,
          "object": false
        },
        "extendDefaults": true
      }
    ],
    "@typescript-eslint/no-empty-function": "off",
    "no-restricted-imports": [
      "error",
      {
        "paths": [
          {
            "name": "styled-components",
            "message": "Please import from styled-components/macro."
          }
        ],
        "patterns": [
          "!styled-components/macro"
        ]
      }
    ],
    "prefer-const": [
      "error",
      {
        "destructuring": "all"
      }
    ]
  },
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "react",
    "jest",
    "react-hooks"
  ],
  "env": {
    "jest/globals": true,
    "es6": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "globals": {
    "__src": true,
    "log": true
  }
}
