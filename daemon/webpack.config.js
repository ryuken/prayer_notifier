const path = require('path');

const config = {
    entry: {
        bundle: path.join(__dirname, 'client/index.js')
    },
    output: {
        path: path.join(__dirname, 'public'),
        //publicPath: "/static/build/",
        filename: 'bundle.js'
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
