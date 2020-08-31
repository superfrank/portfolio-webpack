const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin"); //installed via npm
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
        filename: "[name].[hash:20].js",
        path: buildPath,
    },
    node: {
        fs: "empty",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",

                options: {
                    presets: ["env"],
                },
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        // creates style nodes from JS strings
                        loader: "style-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader?url=false",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            outputStyle: "expanded",
                            sourceMap: true,
                            sourceMapContents: true,
                        },
                    },
                    // Please note we are not running postcss here
                ],
            },
            {
                test: /\.(gif|svg)$/i,
                use: [
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name].[hash:20].[ext]",
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                // Load all icons
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                // Load all videos
                test: /\.(mov|mp4|webm)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash:20].[ext]",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(buildPath),
        new HtmlWebpackPlugin({
            template: "./index.html",
            // Inject the js bundle at the end of the body of the given template
            inject: "body",
            chunks: ["index"],
            filename: "index.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/project/internet.html",
            // Inject the js bundle at the end of the body of the given template
            inject: "body",
            chunks: ["internet"],
            filename: "internet.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/project/world-cup.html",
            // Inject the js bundle at the end of the body of the given template
            inject: "body",
            chunks: ["worldcup"],
            filename: "world-cup.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/project/uk-election.html",
            // Inject the js bundle at the end of the body of the given template
            inject: "body",
            chunks: ["ukelection"],
            filename: "uk-election.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/onepage/hello-google.html",
            // Inject the js bundle at the end of the body of the given template
            inject: "body",
            chunks: ["hellogoogle"],
            filename: "hello-google.html",
        }),
        new MiniCssExtractPlugin({
            filename: "styles.[contenthash].css",
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {
                map: {
                    inline: false,
                },
                discardComments: {
                    removeAll: true,
                },
                discardUnused: false,
            },
            canPrint: true,
        }),
    ],
};
