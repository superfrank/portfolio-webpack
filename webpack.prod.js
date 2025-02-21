const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildPath = path.resolve(__dirname, "public_html");

module.exports = {
    devtool: "source-map",
    entry: {
        index: "./src/index.js",
        internet: "./src/project/internet.js",
        worldcup: "./src/project/world-cup.js",
        ukelection: "./src/project/uk-election.js",
        tweenmax: "./src/assets/TweenMax.min.js",
        hellogoogle: "./src/onepage/hello-google.js",
    },
    output: {
        filename: "[name].[contenthash:20].js",
        path: buildPath,
        clean: true, // Ensures the output directory is cleaned before each build
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", { targets: "defaults" }],
                        ],
                    },
                },
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate files
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(gif|svg)$/i,
                type: "asset/resource", // Use asset modules for image handling
            },
            {
                test: /\.(png|jpg)$/,
                type: "asset/inline",
                parser: {
                    dataUrlCondition: {
                        maxSize: 8192, // Inline images smaller than 8KB
                    },
                },
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                type: "asset/resource", // Use asset modules for fonts
            },
            {
                test: /\.(mov|mp4|webm)$/,
                type: "asset/resource", // Use asset modules for videos
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), // Clean the build directory
        new HtmlWebpackPlugin({
            template: "./index.html",
            inject: "body",
            chunks: ["index"],
            filename: "index.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/project/internet.html",
            inject: "body",
            chunks: ["internet"],
            filename: "internet.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/project/world-cup.html",
            inject: "body",
            chunks: ["worldcup"],
            filename: "world-cup.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/project/uk-election.html",
            inject: "body",
            chunks: ["ukelection"],
            filename: "uk-election.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/onepage/hello-google.html",
            inject: "body",
            chunks: ["hellogoogle"],
            filename: "hello-google.html",
        }),
        new MiniCssExtractPlugin({
            filename: "styles.[contenthash].css", // Extract CSS into separate files with content hash
        }),
    ],
};
