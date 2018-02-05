const merge = require("webpack-merge")
const base = require("./webpack.base.js")
const WebpackShellPlugin = require("webpack-shell-plugin")
module.exports = merge(base, {
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ["node_modules/node-dev/bin/node-dev dist/ups-chan.js"]
    })
  ]
})
