const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => ({
  mode: env.development ? "development" : "production",
  entry: {
    "index-page": "./src/index-page/main.tsx",
  },
  output: {
    path: `${__dirname}/build`,
    filename: (pathData) => pathData.chunk.name + "/main.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public/", to: "./" }],
    }),
  ],
});
