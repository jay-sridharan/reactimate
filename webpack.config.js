var path = require('path');
var config = {
  entry: [
    './main.js',
  ],
  output: {
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets:[ 'es2015', 'react', 'stage-2' ]
        }
      }
    ],
  }

};
module.exports = config;
