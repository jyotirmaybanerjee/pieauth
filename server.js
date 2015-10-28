import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swig from 'swig';
import React from 'react';
import ReactDOM from 'react-dom/server';
import mongoose from 'mongoose';
import _ from 'underscore';

const Router = require('react-router');

const RoutingContext = Router.RoutingContext;
const routes = require('./app/routes');
const config = require('./server/config');
const debug = require('debug')('app:' + process.pid);

debug("Starting application");
debug("Initializing Mongoose");

mongoose.connect(config.database);
mongoose.connection.on('error', () => {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

debug("Initializing express");
const app = express();
debug("Attaching plugins");
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

app.use("/api", require(path.join(__dirname, "server/apiRoutes", "api.js"))());

app.use((req, res) => {
  Router.match({ routes: routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      let html = ReactDOM.renderToString(<RoutingContext {...renderProps} />);
      let page = swig.renderFile('build/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(400).send('Page Not Found')
    }
  });
});

const server = require('http').createServer(app);

server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
