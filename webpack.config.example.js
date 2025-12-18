const path = require('path');

module.exports = {
  mode: 'development',
  entry: './example/example.js',
  output: {
    path: path.resolve(__dirname, 'example'),
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname), "node_modules", "dist"]
  }
};
