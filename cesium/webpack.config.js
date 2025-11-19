const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Paths to Cesium
const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "node_modules/cesium/Build/Cesium/Workers";

module.exports = {
  context: __dirname,
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
    sourcePrefix: "", // Needed by Cesium
  },
  amd: {
    // Allow Cesium to use require in a webpack-friendly way
    toUrlUndefined: true,
  },
  resolve: {
    alias: {
      cesium: path.resolve(__dirname, cesiumSource),
    },
    mainFiles: ["module", "main", "Cesium"],
  },
  module: {
    rules: [
      // Babel loader for JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { modules: "commonjs" }]],
          },
        },
      },
      // CSS loader
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // Images and other assets
      {
        test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
        use: ["url-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, cesiumWorkers), to: "Workers" },
        { from: path.resolve(__dirname, cesiumSource, "Assets"), to: "Assets" },
        { from: path.resolve(__dirname, cesiumSource, "Widgets"), to: "Widgets" },
        { from: path.resolve(__dirname, cesiumSource, "ThirdParty"), to: "ThirdParty" },
      ],
    }),
    new webpack.DefinePlugin({
      // Relative base path for Cesium to load assets
      CESIUM_BASE_URL: JSON.stringify("/"),
    }),
  ],
  mode: "development",
  devtool: "source-map", // optional: helpful for debugging
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 8081,
    hot: true,
  },
};

