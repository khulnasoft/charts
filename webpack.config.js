const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require("path")

const isProduction = process.env.NODE_ENV === "production"

module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: !isProduction ? "eval-cheap-source-map" : "hidden-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isProduction ? "sdk.min.js" : "sdk.js",
    library: "KhulnasoftSDK",
    libraryTarget: "var",
  },
  externals: [
    "react",
    "react-dom",
    "styled-components",
    ({ request }, callback) => {
      if (/@khulnasoft\/khulnasoft-ui\/.+$/.test(request)) {
        return callback(null, "commonjs " + request)
      }
      callback()
    },
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            use: ["raw-loader"],
            include: [/src\//],
            exclude: [/node_modules\/@khulnasoft\/khulnasoft-ui/],
          },
          {
            use: [
              {
                loader: "svg-sprite-loader",
              },
              "svgo-loader",
            ],
            include: [/node_modules\/@khulnasoft\/khulnasoft-ui/],
          },
        ],
      },
      {
        test: /\.s?[ac]ss$/,
        oneOf: [
          { exclude: /node_modules/, use: ["raw-loader"] },
          {
            use: ["css-loader", "sass-loader"],
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}
