const merge = require("webpack-merge")
const dev = require("./webpack.dev.js")
const WebpackShellPlugin = require("webpack-shell-plugin")
module.exports = merge(dev, {
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: [
        "node_modules/node-dev/bin/node-dev --inspect-brk=9229 dist/ups-chan.js"
      ]
    })
  ]
})
