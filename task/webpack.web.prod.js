const webpack = require('webpack')
const base = require('./webpack.web')

module.exports = Object.assign({}, base, {
  plugins: base.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': `"production"`
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
  ]),
})
