const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        "bundle.js": "./app/js/main.js",
    },
    target: 'electron',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader',
                            {
                                loader: 'sass-resources-loader',
                                options: {
                                    resources: path.resolve(__dirname, 'app/config/vars.scss'),
                                },
                            },
                        ],
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.css/,
                use: [
                    {
                        loader: "style-loader" // embed style
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }
                ]
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
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'app/dist')
    },
    // plugins: [
    //     new WebpackNotifierPlugin({
    //         title: 'MerodiDevbox'
    //     })
    // ]
};
