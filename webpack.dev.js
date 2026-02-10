const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "eval-cheap-module-source-map",
    entry: {
        index: "./src/index.js",
        internet: "./src/project/internet.js",
        worldcup: "./src/project/world-cup.js",
        ukelection: "./src/project/uk-election.js",
        tweenmax: "./src/assets/TweenMax.min.js",
        hellogoogle: "./src/onepage/hello-google.js",
        nomow: "./src/project/no-mow.js",
    },
    devServer: {
        port: 8080,
        static: {
            directory: path.join(__dirname, "dist"),
        },
    },
    node: {
        __dirname: true,
        __filename: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                    loader: "sass-loader",
                    options: {
                        sassOptions: {
                        quietDeps: true,
                             quiet: true,
                        },
                    },
                    },
                ],
            },
            {
                test: /\.(gif|svg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(png|jpg)$/,
                type: "asset/inline",
                parser: {
                    dataUrlCondition: {
                        maxSize: 8192,
                    },
                },
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                type: "asset/resource",
            },
            {
                test: /\.(mov|mp4|webm)$/,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            inject: true,
            chunks: ["index"],
            filename: "index.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/project/internet.html",
            inject: true,
            chunks: ["internet"],
            filename: "internet.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/project/world-cup.html",
            inject: true,
            chunks: ["worldcup"],
            filename: "world-cup.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/project/uk-election.html",
            inject: true,
            chunks: ["ukelection"],
            filename: "uk-election.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/onepage/hello-google.html",
            inject: true,
            chunks: ["hellogoogle"],
            filename: "hello-google.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/project/no-mow.html",
            inject: true,
            chunks: ["nomow"],
            filename: "no-mow.html",
        }),
    ],
};
