const ExtractTextPlugin = require("extract-text-webpack-plugin");

const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 2,
        minimize: true
      }
    },
    {
      loader: 'postcss-loader'
    },
    {
      loader: 'sass-loader'
    },
    {
      loader: 'sass-resources-loader',
      options: {
        resources: './src/resources/*.scss'
      }
    }
  ]
});


module.exports = cssProd;
