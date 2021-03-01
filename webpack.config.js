const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: "./public/index.js",
  mode: process.env.ENVIRONMENT || "production",
  output: {
    filename: "[name].[chunkhash].chunk.js",
    path: path.resolve(__dirname, "static")
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "DevReader",
      filename: "index.html",
      template: "views/index.html"
    }),
    new WorkboxPlugin.GenerateSW({ skipWaiting: true, clientsClaim: true })
  ]
};
