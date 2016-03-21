const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

//const AUTOPREFIXER_BROWSERS = [
//  'Android 2.3',
//  'Android >= 4',
//  'Chrome >= 20',
//  'Firefox >= 24',
//  'Explorer >= 8',
//  'iOS >= 6',
//  'Opera >= 12',
//  'Safari >= 6'
//];

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:8082',
    'webpack/hot/dev-server',
    './index'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
        include: __dirname
      },

      {
        test: /\.css$/i,
        exclude: /\.useable\.css$/,
        loader:  'style-loader/useable!css-loader!postcss-loader',
      },
      { test: /\.useable\.css$/, loader: "style/useable!css" },
      {
        test: /\.scss$/,
        loader: 'style-loader/useable!css-loader!postcss-loader!sass-loader',
      },  {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.(eot|ttf|wav|mp3|mp4)$/,
        loader: 'file-loader',
      },
    ]
  },
  postcss: [
    autoprefixer({ browsers: ["last 2 versions"] })
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },
  devServer: {
    historyApiFallback: true
  }

};
