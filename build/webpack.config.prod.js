const {
  BaseCssTransform,
  SOURCE_DIR
} = require('./config');

const webpack = require('webpack'),
  merge = require('webpack-merge'),
  baseConfig = require('./webpack.config.base'),
  minimist = require('minimist'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

const options = minimist(process.argv.slice(2));
const packagePath = options.path ? `${options.path}` : '';

module.exports = merge(baseConfig, {
  mode: 'production',
  performance: {
    hints: 'error',
    //入口起点的最大体积 整数类型（以字节为单位）
    maxEntrypointSize: 500000000,
    //生成文件的最大体积 整数类型（以字节为单位 300k）
    maxAssetSize: 300000000,
    //只给出 js 文件的性能提示
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    }

  },
  stats: 'errors-only',
  module: {
    rules: [{
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          ...BaseCssTransform,
          {
            loader: 'sass-loader',
            options: {
              includePaths: [SOURCE_DIR],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          ...BaseCssTransform,
          {
            loader: 'less-loader',
            options: {
              includePaths: [SOURCE_DIR],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, ...BaseCssTransform],
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 200000000000,
            name: '[name].[hash:8].[ext]',
            outputPath: '../../assets/images/',
            // publicPath: '../../assets/images/'
            // outputPath: `${packagePath ? packagePath + '/' : ''}assets/images/`,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});
