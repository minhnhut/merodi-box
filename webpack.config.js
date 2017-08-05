const path = require('path');

module.exports = {
    entry: {
        "bundle.css": "./app/scss/app.scss",
        "bundle.js": "./app/js/app.js",
    },
    target: 'electron',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: "vue-loader" // compiles Sass to CSS
            }]
        }]
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'app/dist')
    }
};