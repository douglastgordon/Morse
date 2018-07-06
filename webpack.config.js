const path = require("path");

module.exports = {
  context: __dirname,
  mode: "development",
  entry: "./main.js",
  output: {
    path: path.join(__dirname),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    }]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", ".scss"]
  }
}
