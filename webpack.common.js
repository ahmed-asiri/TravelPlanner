const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    target: 'node',
    entry: "./src/client/index.js",
    module: {
        rules: [
            
            {
                test: /\.(gif|png|jpe?g|svg|ico)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]'
                    }
                  }
                  ,
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true, // webpack@1.x
                      disable: true, // webpack@2.x and newer
                      name: "[name].[ext]"
                    },
                  },
                ],
              },
              {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/client/view/index.html',
            filename: '../index.html'
        })
    ]
};