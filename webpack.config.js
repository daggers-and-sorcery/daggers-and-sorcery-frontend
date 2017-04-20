var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './static/main.js',
    resolve: {
        modules: [
            path.resolve('static')
        ]
    },
    output: {
        path: path.resolve('./static/bundle/'),
        filename: 'bundle-[hash].js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.scss/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            root: '.'
                        }
                    }
                ]
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+|\d+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff'
                        }
                    }
                ]
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            mimetype: 'application/octet-stream'
                        }
                    }
                ]
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                    }
                ]
            },
            {
                test: /map.\d+\.json$/,
                use: [
                    {
                        loader: "url-loader",
                    }
                ]
            },
            {
                test: /\/image\/map\/tileset\/.*?\.png$/,
                use: [
                    {
                        loader: "url-loader",
                    }
                ]
            },
            {
                test: /\/image\/player\.png$/,
                use: [
                    {
                        loader: "url-loader",
                    }
                ]
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: "file-loader",
                    }
                ]
            },
            {
                test: /\.jpg$/,
                use: [
                    {
                        loader: "file-loader",
                    }
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    {
                        loader: "xml-loader",
                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            mimetype: 'image/svg+xml'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './static/index.html',
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourceMap: false
        })
    ]
};