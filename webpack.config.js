const path = require('path');
const webpack = require('webpack');

//基礎設置
module.exports = {
  entry: './src/index.js',//輸入點
  output: { //輸出點
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

//jquery
plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
]