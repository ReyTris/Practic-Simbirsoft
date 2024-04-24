import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'production' | 'development';

interface EnvVariables {
	mode: Mode;
	port: 5000;
}

export default (env: EnvVariables) => {
	const isDev = env.mode === 'production';

	const config: webpack.Configuration | DevServerConfiguration = {
		mode: env.mode ?? 'development',
		entry: path.resolve(__dirname, 'src/index.tsx'),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'build.[contenthash].js',
			clean: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'public', 'index.html'),
			}),
			new webpack.ProgressPlugin(),
		],
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: ['style-loader', 'css-loader', 'sass-loader'],
				},
				// {
				// 	test: /\.tsx?$/,
				// 	use: 'ts-loader',
				// 	exclude: /node_modules/,
				// },
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-typescript',
								['@babel/preset-react', { runtime: 'automatic' }],
							],
						},
					},
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		devtool: 'inline-source-map',
		devServer: {
			port: env.port ?? 3000,
			open: true,
		},
	};

	return config;
};
