const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  src: path.resolve(__dirname, 'src'),
  template: path.resolve(__dirname, 'src', 'index.html'),
  out: path.resolve(__dirname, 'out')
};

module.exports = {
  context: paths.src,
  entry: ['./main.js'],
  output: {
    path: paths.out,
    filename: '[hash].js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(png|jpg|gif|svg|woff|woff2|swf|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },

      {
        test: /\.(sass|scss)$/,
        loaders: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          { loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ template: paths.template }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
