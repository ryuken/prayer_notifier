const path = require('path');

const config = {
    mode: "production",
    entry: {
        bundle: path.join(__dirname, 'client/index.js')
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};

module.exports = config;