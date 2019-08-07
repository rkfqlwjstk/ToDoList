const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true,
                        },
                    },
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)/,
                use: ["file-loader"],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "webpack-react-start-kit",
            template: "./public/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./build",
        noInfo: true,
        open: true,
        port: 9000,
        after(app) {
            app.listen(3000, function() {
                console.log("Webpack dev server is listening on port 9000");
            });
        },
    },
};
