'use strict'
const resolve = require('path').resolve
const webpack = require('webpack')
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const NotifierPlugin = require('webpack-notifier')
const webDir = resolve(__dirname, '../src/web')

module.exports = {

  entry: {
    'index.js': './src/web/index.js',
  },

  devtool: 'cheap-module-source-map',

  output: {
    pathinfo: true,
    path: 'dist/web',
    filename: '[name]',
    sourceMapFilename: '[name].map',
  },

  module: {
    preLoaders: [
      { test: /\.js$/, include: webDir, loader: 'eslint' },
    ],
    loaders: [
      { test: /\.js$/, include: webDir, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(svg|eot|ttf|woff|woff2)(\?.+)?$/, loader: 'url' },
    ],
  },

  resolve: {
    // 和material-ui冲突了
    // alias: {
    //   'react': 'react-lite',
    //   'react-dom': 'react-lite',
    // },
    extensions: ['', '.js'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main', 'style'],
  },

  plugins: [
    new NpmInstallPlugin({ save: true }),
    new NotifierPlugin({ alwaysNotify: true }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': `"development"`
      }
    }),
  ],
}
