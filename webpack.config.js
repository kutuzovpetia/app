const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
console.log('IS DEV', isDev);

const optimization = () =>{
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (!isDev){
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config;
}

const filename = ext => isDev ? `[name].${ext}`:`[name].[hash].${ext}`


//Конфигурация webpack
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill','./index.js'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    resolve: {
        extensions: ['.js', '.json', '.png'],
    },
    devServer: {
        port: 4200,
        overlay: true,
        stats: 'errors-only',
        // hot: isDev
    },
    plugins:[
        // html
        new HTMLWebpackPlugin({
            template: './index.html',
            minify:{
                collapseWhitespace: !isDev
            }
        }),
        // clear dist
        new CleanWebpackPlugin(),
        // Copy files
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: path.resolve(__dirname, 'src/icon.png'), to: path.resolve(__dirname, 'dist')}
        //     ]
        // }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })

    ],
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // publicPath: path.resolve(__dirname, 'dist')
                        },
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    }
}