let path = require('path');
let webpack = require('webpack');
let HtmlwebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: {
        index: path.resolve(APP_PATH, 'index.js')
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    //启动dev source map，出错以后就会采用source-map的形式直接显示你出错代码的位置
    devtool: 'eval-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 1111,
        contentBase: "./", // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 不跳转
        inline: true // 实时刷新
    },
    module: {
        rules: [{
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/, //需要排除的目录
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'es2015',
                                {
                                    "modules": false
                                }
                            ],
                            'react'
                        ]
                    }
                }]
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    'sass-loader'
                ]         
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: './index.html', // 模版文件
            // favicon: path.resolve(APP_PATH, './styles/img/favicon.ico')
        }),
        new webpack.HotModuleReplacementPlugin() // 热加载插件
    ],
    //自动扩展文件后缀名，意味着require模块可以省略不写后缀名
    resolve: {
        extensions: ['.js', '.jsx']
    }
}