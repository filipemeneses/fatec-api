const path = require('path');
const webpack = require('webpack');
const yargs = require('yargs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let nodeModulesPath = path.resolve(__dirname, 'node_modules');
let libraryFilename = 'fatec-api',
  plugins = [],
  outputFile,
  isProduction = yargs.argv.p;

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: { comments: false },
      sourceMap: false
    }));
  outputFile = libraryFilename + '.min.js';
} else {
  outputFile = libraryFilename + '.js';
}
if (yargs.argv.d) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  context: path.resolve("./src"),
  target: 'node',
  entry: './index.ts',
  output: {
    filename: outputFile,
    libraryTarget: 'commonjs',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        'test': /\.tsx?$/,
        'loaders': ['babel-loader','ts-loader'],
        'exclude': [/(node_modules|dist)/,nodeModulesPath]
      },
      {
        'test': /\.(jsx?)$/,
        'loaders': ['babel'],
        'exclude': [/(node_modules|dist)/,nodeModulesPath]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'tslint-loader',
            options: {
              emitErrors: true,
              failOnHint: true
            }
          }
        ],
        enforce: 'pre',
        exclude: /(node_modules|dist)/
      }
    ]
  },
  externals : {
    'request-promise-native': 'request-promise-native',
    'cheerio': 'cheerio'
  },
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
