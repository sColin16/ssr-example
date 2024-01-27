const path = require('path')

module.exports = {
  entry: './src/clientEntry.tsx',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // All .ts and .tsx files use the ts-loader
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx"]
  }
}
