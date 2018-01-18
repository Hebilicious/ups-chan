const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
//Clean the dist directory between each builds.
const CleanWebpackPlugin = require('clean-webpack-plugin');
//Use nodemon to livereload our bot.
const NodemonPlugin = require('nodemon-webpack-plugin');
//Ignore node externals
const nodeExternals = require('webpack-node-externals');


module.exports = {
  entry: './bot/app.js',
  plugins: [
    new CleanWebpackPlugin(['dist'], {exclude: [ '.gitignore' ]}),
    new NodemonPlugin(),
    new webpack.BannerPlugin({banner:'require("source-map-support").install();',  raw: true, entryOnly: false })
  ],
  target: 'node',
  node:{
    console:true
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: nodeExternals(),
  devtool: 'sourcemap'
};
