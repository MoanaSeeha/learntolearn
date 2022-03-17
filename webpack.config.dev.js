const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	//devtool: 'inline-module-source-map',
  devtool: 'source-map',
	entry: [
		'./src/index.js'
		// './src/main.js'
		// './src/main.js'
	],
	output: {
		// path: __dirname + '/dist',
		path: __dirname + '/public',
		publicPath: '/',
    filename: '[name].bundle.js',
	},
  optimization: {

    runtimeChunk: 'single',

    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        },
        vendorModules: {
          test: /src\/js\/modules/,
          name: 'vendor-modules',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
	module: {
		rules: [
			{
				enforce: 'pre',
        test: /\.js$/,
				exclude: /node_modules/,
				// use: [
        //   'babel-loader',
        //   'eslint-loader',
        // ]
        use: [
          {
            loader: 'babel-loader',
          },
          // {
          //   loader: 'eslint-webpack-plugin',
          //   options: {
          //     quiet: true
          //   }
          // }
        ]
      },
			{
				test: /\.js$/,
				//exclude: /node_modules/,
				use: ['babel-loader']
			},
      {
        test: /\.ts$/,
        use: ['babel-loader']
      },
      // {
      //   test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/, // TODO: stay away from internal fonts
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'fonts/'
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // something is making styles show up twice.     I don't want style loader loads twice???
          "style-loader", // Creates `style` nodes from JS strings
          "css-loader",      // Translates CSS into CommonJS
          "sass-loader",          // Compiles Sass to CSS
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: 'svg-url-loader',
      //       options: {
      //         limit: 10000,
      //       },
      //     },
      //   ],
      // },
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', ".ts"],
    fallback: {
      "fs": false,
      "os": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "browser": false,
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer"),
      "crypto": false,
      "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
    }
	},

  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
	plugins: [
    //new ESLintPlugin(),
    new Dotenv(),
    new ESLintPlugin({
      quiet: true,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
		new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      // template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: false
      //inject: 'body' // causing styles to be loaded twice!
    })
	]
};
