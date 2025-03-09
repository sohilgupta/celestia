const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  webpack: {
    plugins: {
      add: [
        new CopyWebpackPlugin({
          patterns: [
            {
              from: 'node_modules/cesium/Build/Cesium/Workers',
              to: 'cesium/Workers'
            },
            {
              from: 'node_modules/cesium/Build/Cesium/ThirdParty',
              to: 'cesium/ThirdParty'
            },
            {
              from: 'node_modules/cesium/Build/Cesium/Assets',
              to: 'cesium/Assets'
            },
            {
              from: 'node_modules/cesium/Build/Cesium/Widgets',
              to: 'cesium/Widgets'
            }
          ]
        })
      ]
    },
    configure: (webpackConfig) => {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@': path.resolve(__dirname, 'src')
      };
      webpackConfig.module.rules.push({
        test: /\.glsl$/,
        use: ['raw-loader']
      });
      return webpackConfig;
    }
  }
}; 