const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin"); //installed via npm
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const buildPath = path.resolve(__dirname, "dist");

module.exports = {
    devtool: "source-map",
    entry: {
        tweenmax: "./src/assets/TweenMax.min.js",
        index: "./src/index.js",
        internet: "./src/project/internet.js"
    },
    output: {
        filename: "[name].[hash:20].js",
        path: buildPath
    },
    node: {
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",

                options: {
                    presets: ["env"]
                }
            },
            {
                test: /\.(scss|css|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // Runs compiled CSS through postcss for vendor prefixing
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            outputStyle: "expanded",
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                ]
            },
            {
                test: /\.(gif|svg)$/i,
                use: [
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true // webpack@2.x and newer
                        }
                    }
                ]
            },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name].[hash:20].[ext]",
                            limit: 8192
                        }
                    }
                ]
            },
            {
                // Load all icons
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            },
            {
                // Load all videos
                test: /\.(mov|mp4|webm)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash:20].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(buildPath),
        new HtmlWebpackPlugin({
            template: "./index.html",
            // Inject the js bundle at the end of the body of the given template
            inject: "body",
            chunks: ["index"],
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/project/internet.html",
            // Inject the js bundle at the end of the body of the given template
            inject: "body",
            chunks: ["internet"],
            filename: "internet.html"
        }),
        new MiniCssExtractPlugin({
            filename: "styles.[contenthash].css"
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {
                map: {
                    inline: false
                },
                discardComments: {
                    removeAll: true
                },
                discardUnused: false
            },
            canPrint: true
        })
    ]
};
