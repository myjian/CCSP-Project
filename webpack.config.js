const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => ({
  mode: env.development ? 'development' : 'production',
  entry: './src/main.tsx',
  output: {
    path: `${__dirname}/build`,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|svg|jpg)$/i,
        type: 'asset/resource',
        generator: {
          // Where to store these files
          outputPath: 'assets/',
          // Where to load these files
          publicPath: 'assets/',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jpg', '.png'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{from: 'public/', to: './'}],
    }),
  ],
});
