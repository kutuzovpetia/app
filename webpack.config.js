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

console.log(path.resolve(__dirname, 'src'))

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
        host: '0.0.0.0',
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
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/assets/images/cards-img'), to: path.resolve(__dirname, 'dist/images')}
            ]
        }),
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
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts',
                },
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