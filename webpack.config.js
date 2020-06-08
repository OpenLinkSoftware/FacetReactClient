const webpack = require('webpack');

module.exports = {
  entry: { app: './src/index.js' },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: __dirname + '/src',
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist/',
    publicPath: '/',
    filename: '[name]-bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    port: 8600
  }
};
