const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');


module.exports = {
    entry: {
        app: path.resolve('src/index.js')
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'), //it points what file its gonna serf
        port: 9000, //localhost
        // hot: true, // hot reload scripts but don't reload html page
        overlay: true, //in order to watch the errors on the screen
        open: true //
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }, //compile new js to old version
            { test: /\.(css|scss|sass)$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] }, // css обработка
            // { test: /\.html$/, use: 'html-loader' }, //html обработка
            {
                test: /\.hbs$/, loader: 'handlebars-loader', query: {
                    inlineRequires: '/img/'
                }
            }, //html обработка
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192 //if the size of the file is less than 8192 the file will be coded into base64 like data:....blah blah
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('src/index.hbs'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin()
    ]
};