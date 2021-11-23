const HtmlWebpackPlugin = require("html-webpack-plugin")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const packageJSON = require("./package.json")

module.exports = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8081/"
  },
  devServer: {
    port: 8081,
    historyApiFallback: true // 当页面找不到的时候，默认跳转到index.js中
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules文件
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            // 1. 避免 babel 转义语法后 helper 函数重复 
            // 2. 避免 babel polyfill 将 API 添加到全局

            plugins: ["@babel/plugin-transform-runtime"]
            // 用于做优化的
          }
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap.js"
      },
      shared: packageJSON.dependencies
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}
