const path = require("path");
const webpack = require("webpack");
const WorkboxPlugin = require('workbox-webpack-plugin');
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist/assets")
    },
    plugins: [
        new WorkboxPlugin.GenerateSW({
            swDest: "sw.js",
            skipWaiting: true,
            clientsClaim: true
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        })   
    ],
    module: {
    rules: [
        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader, 
                "css-loader", 
                "sass-loader"]
        },
    ]
}
});