// base code of webpack to multiple configs
// the estlint come from https://github.com/wesbos/eslint-config-wesbos
const path = require('path');
// const webpack = require('webpack');
const { merge } = require("webpack-merge");

// if Used, install plugin as dev-dependency
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = env => {
  const { PLATFORM, VERSION } = env;
  return merge([
    {
      entry: ['@babel/polyfill', APP_DIR],
      output: {
        publicPath: '/',
      },
      devServer: {
        disableHostCheck: true,
      },
      module: {
        rules: [
          // -- Javascript
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          // -- Styles 
          {
            test: /\.scss$/,
            exclude: /\.module.scss$/,
            use: [
              PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.module.scss$/,
            use: [
              { loader: PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    mode: 'local',
                    localIdentName: PLATFORM === 'production' ? '[hash:base64]' : '[path][name]__[local]'
                  },
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: PLATFORM === 'production' ? false : true
                }
              }
            ]
          },
          // -- Assets
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
          }
        ]
      },
      // resolve: {
      //   alias: {
      //     "identifier": path.resolve(__dirname, 'Route'),
      //     "@assets": path.resolve(__dirname, 'src/assets'),
      //   }
      // },
      plugins: [
        new HtmlWebpackPlugin({
          inject: true,
          template: './public/index.html',
          filename: 'index.html',
        }),
        // new webpack.DefinePlugin({
        //   'process.env.VERSION': JSON.stringify(env.VERSION),
        //   'process.env.PLATFORM': JSON.stringify(env.PLATFORM),
        // }),
        // if Used, install plugin as dev-dependency
        // new CopyWebpackPlugin({ patterns: [{ from: 'src/assets' }] }),
      ],
    }
  ])
};