const path = require('path');
const webpack = require('webpack');
const MpAdaptorPlugin = require('@remax/core/lib/webpack/MpAdaptorPlugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'none',
  target: 'web', // 必需字段，不能修改
  context: path.resolve(__dirname, './src'),
  entry: {
    index: './pages/index/index',
    index2: './pages/index2/index',
  },
  output: {
    path: path.resolve(__dirname, '../wechat/h5code'),
    filename: '[name].js',
    library: {
      type: 'window',
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        remaxVendors: {
          name: 'remax-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          minChunks: 2,
          minSize: 0,
          priority: 2,
        },
      },
    },
    minimizer: [],
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          // Use `.swcrc` to configure swc
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              transform: {
                react: {
                  pragma: 'React.createElement',
                  pragmaFrag: 'React.Fragment',
                  throwIfNamespace: true,
                  development: false,
                  useBuiltins: false,
                },
              },
            },
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'development'",
    }),
    new MpAdaptorPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
