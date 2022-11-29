const path = require('path');
const { merge } = require('webpack-merge');
const LoadablePlugin = require('@loadable/webpack-plugin');
const shared = require('./webpack.shared');
const moduleFederationPlugin = require('./module-federation');

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  name: 'server',
  target: false,
  entry: {
    main: ['@babel/polyfill', path.resolve(__dirname, '../src/server/index')],
    serverAppEntrypoint: path.resolve(__dirname, '../src/server/serverAppEntrypoint'),
  },
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    libraryTarget: 'commonjs-module',
  },
  mode: 'production',
  plugins: [
    ...moduleFederationPlugin.server,

    new LoadablePlugin({
      writeToDisk: true,
    }),
  ],
  stats: {
    colors: true,
  },
};

module.exports = merge(shared, webpackConfig);
