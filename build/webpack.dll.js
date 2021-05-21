const webpack = require('webpack');
const path = require('path');
const vendors = ['vue', 'webpack-zepto', 'dayjs', 'fastclick'];

module.exports = {
  context:path.resolve(__dirname, '../src'),
  entry: {
    static: vendors,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, '../dll'),
    filename: '[name].dll.js',
    library: '[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll', '[name]-manifest.json'),
      name: '[name]_library',
    }),
  ],
};
