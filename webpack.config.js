var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./app/index.tsx",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [ { loader: "ts-loader" } ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { exclude: ["index.html"] }),
    new webpack.EnvironmentPlugin({
      'DIOGRAPH_SERVER_HOST': 'http://diory-server.herokuapp.com'
    })
  ],
  // Example taken from https://medium.com/code-oil/burning-questions-with-answers-to-why-webpack-dev-server-live-reload-does-not-work-6d6390277920
  devServer: {
    publicPath: '/',
    contentBase: "dist",
    watchContentBase: true,
    compress: true,
    port: 4202
  }
};
