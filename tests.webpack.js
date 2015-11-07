import 'babel-core/polyfill';

var context = require.context('./app', true, /-test\.js$/);
context.keys().forEach(context);