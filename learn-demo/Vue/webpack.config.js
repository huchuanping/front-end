var path = require('path');
var webpack = require('webpack');
var vue = require('vue-loader');
var basePath = './src/';
module.exports = {
    entry: basePath + 'main',
    output: {
        'path': 'src/js', //输出路径
        'filename': '[name].js' //打包的js命名
    },
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.(jpe?g|gif|svg)$/i,
            loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]'
        }, {
            test: /\.png$/,
            loader: 'url?limit=10000'
        }, {
            test: /\.css$/,
            loader: 'css-loader'
        }]
    },
    resolve:{
    	alias:{
    		
    	}
    }
}
