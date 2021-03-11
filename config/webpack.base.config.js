/* eslint-disable import/no-extraneous-dependencies */
// base code of webpack to multiple configs
// the estlint come from https://github.com/wesbos/eslint-config-wesbos
const path = require('path');
// const webpack = require('webpack');
const { merge } = require('webpack-merge');

// if Used, install plugin as dev-dependency
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// PortSync search for the next open port if used
const portFinderSync = require('portfinder-sync');

const APP_DIR = path.resolve(__dirname, '../src');
const PREFERED_PORT = 3000;
const PORT = portFinderSync.getPort(PREFERED_PORT);

module.exports = env => {
  const { PLATFORM } = env;
  return merge([
    {
      entry: ['@babel/polyfill', APP_DIR],
      output: {
        publicPath: '/',
      },
      devServer: {
        host: '0.0.0.0',
        port: PORT,
        disableHostCheck: true,
        public: `localhost:${PORT}`,
      },
      module: {
        rules: [
          // -- Javascript
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          // -- Styles
          {
            test: /\.scss$/,
            exclude: /\.module.scss$/,
            use: [
              PLATFORM === 'production'
                ? MiniCssExtractPlugin.loader
                : 'style-loader',
              'css-loader',
              'sass-loader',
            ],
          },
          {
            test: /\.module.scss$/,
            use: [
              {
                loader:
                  PLATFORM === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    mode: 'local',
                    localIdentName:
                      PLATFORM === 'production'
                        ? '[hash:base64]'
                        : '[path][name]__[local]',
                  },
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: PLATFORM !== 'production',
                },
              },
            ],
          },
          // -- Assets
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader'],
          },
        ],
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@assets': path.resolve(__dirname, '../src/Static/Assets'),
        },
      },
      plugins: [
        new HtmlWebpackPlugin({
          inject: true,
          template: './public/index.html',
          filename: 'index.html',
        }),
        // Define env variables here.
        // new webpack.DefinePlugin({
        //   'process.env.PLATFORM': JSON.stringify(env.PLATFORM),
        // }),
        // if Used, install plugin as dev-dependency
        // new CopyWebpackPlugin({ patterns: [{ from: 'src/assets' }] }),
      ],
    },
  ]);
};
