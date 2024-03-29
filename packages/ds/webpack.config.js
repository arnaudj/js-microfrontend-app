const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'ds',
      filename: 'remoteEntry.js',
      exposes: {
        './AgGrid': './src/aggrid',
        './Button': './src/button',
        './Card': './src/card',
        './CardActions': './src/cardactions',
        './CardContent': './src/cardcontent',
        './GoogleChart': './src/googlechart',
        './Collapse': './src/collapse',
        './IconButton': './src/iconbutton',
        './Stack': './src/stack',
        './Typography': './src/typography',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
      },
    }),
    new HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
};
