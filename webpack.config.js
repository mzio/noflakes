process.env.NODE_ENV = "development";
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: "./client/main.js"
  },

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
