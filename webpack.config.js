module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
              presets: ['@babel/env', '@babel/react']
          }
        }]
      }, {
        test:/\.scss$/,
        use:['style-loader','css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/public',
    compress: true,
    port: 9000 
  }
}
