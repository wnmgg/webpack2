//webpack  是node写出来的 node语法
let path = require('path');
let HtmlWebpackPlugin = require("html-webpack-plugin"); //html模板
let MiniCssExtractPlugin = require('mini-css-extract-plugin'); //抽离<style>，形成link形式
let OptimizeCss = require('optimize-css-assets-webpack-plugin');    //压缩css
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');    //用OptimizeCss优化css，就必须用UglifyJsPlugin优化js
//console.log(path.resolve('dist'));
module.exports = {
    optimization:{  //优化项
        minimizer:[
            new UglifyJsPlugin({
                cache:true,     //缓存
                parallel:true,  //并发
                sourceMap:true,     //是否要源码映射
            }),
            new OptimizeCss()
        ]
    },
    devServer:{ //开发服务器的配置
        port:3000,      //配置端口号
        progress:true,  //打包时候是否有进度条
        contentBase:'./build',  //启动文件的路径
        compress:true,      //是否优化
    },
    mode:'production', //模式 development 开发    production 生产
    entry:'./src/index.js', //入口
    output:{
        filename:'bundle.js',   //打包后的文件名
        path:path.resolve(__dirname,'build'),    //路径必须是绝对路径，path.resolve可以把相对路径解析成绝对路径
    },
    plugins:[   //数组类型
        new HtmlWebpackPlugin({
            template:'./src/index.html',    //模板的位置
            filename:'index.html',      //生成的html文件名
            minify:{    //压缩html
                removeAttributeQuotes:true,     //去掉双引号
                collapseWhitespace:true,        //压缩成一行
            },
            hash:true,      //加上hash戳,作用及时清除缓存
        }),
        new MiniCssExtractPlugin({
            filename:'main.css'
        })
    ],
    module:{    //模块
        rules:[ //规则
            //css-loader
            //style-loader 把css插入到head标签里
            //loader 顺序 默认是从右向左执行
            //loader可以写成数组，对象
            {
                test:/\.css$/,
                use:[
                    /*{
                        loader:'style-loader',
                        options:{
                            insert:'top', //把<style>标签插到前面
                        }
                    },*/
                    MiniCssExtractPlugin.loader,    //创建个link标签，把内容放进去
                    'css-loader',
                    'postcss-loader'   //样式前加前缀，如-webkit-
                ]
            },
            //less-loader
            {
                test:/\.less$/,
                use:[
                    /*{
                        loader:'style-loader',
                        options:{
                            insert:'top', //把<style>标签插到前面
                        }
                    },*/
                    MiniCssExtractPlugin.loader,    //创建个link标签，把内容放进去
                    'css-loader',
                    'postcss-loader',   //样式前加前缀，如-webkit-
                    'less-loader',  //把less---css
                ]
            }
        ]
    }
}