
const path = require('path')
// const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

let shared = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      }
    ]
  },
  plugins: [
    // new uglifyJsPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ]
}

let cfmgu = Object.assign({}, {
  entry: './src/index.js',
  output: {
    library: 'CgMG',
    libraryTarget: 'umd',
    // libraryExport: 'default',
    path: path.resolve(__dirname, 'releases'),
    filename: 'cfmodguide_v1.0.0.js',
  },
}, shared)


module.exports = [
    cfmgu,
]



