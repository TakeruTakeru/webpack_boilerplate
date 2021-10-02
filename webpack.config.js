// @ts-check
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @typedef {import('webpack').Configuration} Config
 * @typedef {(env: any, argv: any) => Config} ConfigFactory
 */

/**
 * @type {ConfigFactory}
 */
const configFactory = (_, argv) => {
  const isDevelopMode = argv.mode === "development";
  return {
    entry: ["./src/index.ts"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      chunkFilename: "[name].bundle.js",
    },
    target: ["web", "es6"],
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                happyPackMode: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".ts", ".js", ".tsx"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'My Template app',
        h1: "Content Header",
        template: "./template/index.html",
        inject: "head",
        hash: true,
        minify: false,
        filename: "index.html"
      }),
    ],
    devtool: isDevelopMode ? "inline-source-map" : false,
    performance: {
      hints: isDevelopMode ? false : "warning",
      maxAssetSize: 600000,
      maxEntrypointSize: 600000,
    },
    stats: isDevelopMode
      ? {
          builtAt: true,
          assets: false,
          modules: false,
          entrypoints: false,
          hash: false,
          source: true,
          version: false,
        }
      : "errors-warnings",
  };
};

module.exports = configFactory;
