const path = require("path")
const NodemonPlugin = require( 'nodemon-webpack-plugin' ) 

const merge = require("webpack-merge")
const base = require("./webpack.base.js")
const WebpackShellPlugin = require("webpack-shell-plugin")
module.exports = merge(base, {
  plugins: [
    new NodemonPlugin()
    // new WebpackShellPlugin({
    //   onBuildEnd: ["node_modules/node-dev/bin/node-dev dist/ups-chan-dev.js"]
    // })
  ],
  output: {
    filename: "ups-chan-dev.js",
    path: path.resolve(__dirname, "../dist")
  }
})
