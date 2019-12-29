const path = require('path');
const { NormalModuleReplacementPlugin } = require('webpack');
const { override, addWebpackPlugin } = require('customize-cra');

module.exports = override(
  addWebpackPlugin(
    new NormalModuleReplacementPlugin(
      /.*\/generated\/iconSvgPaths.js/,
      path.resolve(__dirname, 'iconSvgPaths.js')
    )
  )
);
