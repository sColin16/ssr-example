const path = require("path")

module.exports = {
  entry: "./src/example/client/clientEntry.tsx",
  output: {
    filename: "client.js",
    path: path.resolve(__dirname, "dist/public"),
  },
  module: {
    rules: [
      // All .ts and .tsx files use the babel loader, which is configured with react + TS presets
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              plugins: [
                "react-require",
                [
                  "module-resolver",
                  {
                    root: ["./src"],
                    extensions: [".ts", ".tsx"],
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx"],
  },
}
