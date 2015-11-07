var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 
      // 'Chrome',
      // 'Safari',
      // 'PhantomJS',
      'Firefox'
    ],
    singleRun: false,
    frameworks: [ 'source-map-support', 'mocha' ],
    files: [
      'tests.webpack.js'
    ],
    exclude: ['node_modules/'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-safari-launcher',
      'karma-firefox-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-source-map-support',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-mocha-reporter'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/,  loader: 'babel-loader' }
        ],
        postLoaders: [ {
            test: /\.js$/,
            exclude: /(server|node_modules|coverage|build)\//,
            loader: 'istanbul-instrumenter' } ]
      }
    },
    port: 9876,
    colors: true,
    autoWatch: true,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  });
};
