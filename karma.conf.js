var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 
      // 'Chrome',
      // 'Safari',
      'PhantomJS'
    ],
    singleRun: false,
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js'
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-safari-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-mocha-reporter'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha', 'coverage' ],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/,  loader: 'babel-loader' }
        ],
        postLoaders: [ {
            test: /\.js$/,
            exclude: /(test|node_modules|build)\//,
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
