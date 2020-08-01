const path = require("path");
const webpack = require("webpack");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist/assets")
    },    
    // This devServer Object will be used for the live server only.
    devServer: {
        contentBase: "./dist",
        open: true
    },
    module: {
    rules: [
        {
            test: /\.scss$/,
            use: [
            "style-loader", 
            "css-loader", 
            "sass-loader"]
        },
    ]
}
});