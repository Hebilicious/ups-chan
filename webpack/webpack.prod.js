const merge = require("webpack-merge")
const path = require("path")

const base = require("./webpack.base.js")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
module.exports = merge(base, {
  plugins: [new UglifyJSPlugin({ sourceMap: true })]
})
