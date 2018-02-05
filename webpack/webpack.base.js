const webpack = require("webpack")
const path = require("path")
const fs = require("fs")

const ExternalsPlugin = require("webpack2-externals-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
module.exports = {
  entry: { app: "./bot/app.js" },
  plugins: [
    new CleanWebpackPlugin("../dist", {
      allowExternal: true,
      exclude: [".gitignore"]
    }),
    new ExternalsPlugin({
      type: "commonjs",
      include: path.resolve(__dirname, "../node_modules")
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"]
      }
    ]
  },
  target: "node",
  devtool: "sourcemap",
  output: {
    filename: "dist.js",
    path: path.resolve(__dirname, "../dist")
  }
}
