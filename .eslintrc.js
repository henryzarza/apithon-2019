module.exports = {
  extends: ['wolox-react'],
  plugins: ['babel'],
  env: {
    jest: true
  },
  settings: {
    'import/resolver': {
      node: {},
      'babel-module': {
        alias: {
          '~screens': './src/app/screens',
          '~config': './src/config',
          '~constants': './src/constants',
          '~redux': './src/redux',
          '~services': './src/services',
          '~utils': './src/utils',
        }
      }
    },
    "react": {
      "version": "detect"
    }
  }
};
