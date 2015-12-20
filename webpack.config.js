var path = require('path');

module.exports = {
    entry: './static/main.js',
    resolve: {
        root: [
            path.resolve('./static')
        ]
    },
    output: {
        path: './static/bundle',
        filename: './bundle.js',
        publicPath: './static/bundle/'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.scss/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?root=."
            },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
            { test: /\.png$/,    loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    }
};