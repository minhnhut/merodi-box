const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: {
        "bundle.js": "./app/js/app.js",
    },
    target: 'electron',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.scss/,
                use: [{
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'app/dist')
    },
    plugins: [
        new WebpackNotifierPlugin()
    ]
};
