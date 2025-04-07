import path from 'path';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration & { devServer?: DevServerConfiguration } = {
	mode: 'development',
	entry: './src/main.ts',
	output: {
		filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    clean: true,
		path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
	},
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: -20,
          reuseExistingChunk: true,
        }
      }
    }
  },
	devServer: {
		static: path.join(__dirname, 'dist'),
		port: 80,
		hot: true,
    open: false
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|ts|jsx|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
					},
				},
			},
			{
				test: /\.(scss|sass)$/,
				use: [
					'style-loader', // Adds CSS to the DOM by injecting a <style> tag
					'css-loader',   // Interprets @import and url() like import/require() and will resolve them
					{
						loader: 'postcss-loader', // Loader for webpack to process CSS with PostCSS
						options: {
							postcssOptions: {
								plugins: () => [require('autoprefixer')],
							},
						},
					},
					'sass-loader', // Loads a SASS/SCSS file and compiles it to CSS
				],
				include: path.resolve(__dirname, 'src'),
			},
			{
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      }
		]
	},
  plugins:[
   new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'), // Path to your HTML template
      filename: 'index.html' // Output file name
   }),
  ],
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolves these extensions automatically
	}
};

export default config;
