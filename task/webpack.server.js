'use strict'
const resolve = require('path').resolve
const webpack = require('webpack')
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const NotifierPlugin = require('webpack-notifier')
const serverDir = resolve(__dirname, '../src/server')

module.exports = {

  target: 'node',

  entry: {
    'index.js': './src/server/index.js',
  },

  // 不知道server 如何使用sourcemap
  // devtool: 'cheap-module-source-map',

  output: {
    pathinfo: true,
    path: 'dist/server',
    filename: '[name]',
    sourceMapFilename: '[name].map',
  },

  module: {
    preLoaders: [
      { test: /\.js$/, include: serverDir, loader: 'eslint' },
    ],
    loaders: [
      { test: /\.json$/, include: serverDir, loader: 'json' },
      { test: /\.js$/, include: serverDir, loader: 'babel' },
    ],
  },

  resolve: {
    extensions: ['', '.js'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },

  externals: [
    (ctx, req,  cb) => {
      // if (resolve(ctx, req).indexOf(serverDir) !== 0) return cb()
      if (/^\.\//.test(req)) return cb()
      cb(null, `commonjs ${req}`)
    },
  ],

  plugins: [
    new NpmInstallPlugin({ save: true }),
    new NotifierPlugin({ alwaysNotify: true }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      rootDir: `"${resolve(__dirname, '..')}"`,
    }),
  ],
}
