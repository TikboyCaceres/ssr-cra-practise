const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

const js = [
  {
    test: /\.css$/i,
    use: ["css-loader"],
  },
  {
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  },
  {
    test: /\.(ts|js)x?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
      },
    },
  }
]

const serverConfig = {
  mode: "development",
  target: "node",
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: {
    "index.js": path.resolve(__dirname, "./src/index.ts")
  },
  module: {
    rules: js,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [
      path.resolve("./src"),
      "node_modules"
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name]",
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
      { from: '../client/build', to: 'client-build/' },
      ]
    })
  ]
};

module.exports = [serverConfig];