import express from 'express';
import path from 'path';
import logger from 'morgan';
import fs from 'fs';
import http from 'http';
import https from 'https';
import swig from 'swig';
import bodyParser from 'body-parser';
import onFinished from 'on-finished';
import React from 'react';
import ReactDOM from 'react-dom/server';
import mongoose from 'mongoose';
import _ from 'lodash';
import compression from 'compression';
import responseTime from 'response-time';

const Router = require('react-router');

const RoutingContext = Router.RoutingContext;
const routes = require('./app/routes');
const config = require('./server/config');
const debug = require('debug')('app:' + process.pid);

const NotFoundError = require(path.join(__dirname, 'server/errors', 'NotFoundError.js'));

debug("Starting application");
debug("Initializing Mongoose");

mongoose.set('debug', true);
mongoose.connect(config.MONGOOSE_URI);
mongoose.connection.on('error', () => {
    debug('Mongoose connection error');
});
mongoose.connection.once('open', function callback() {
    debug('Mongoose connected to the database');
});

debug("Initializing express");
const app = express();
debug("Attaching plugins");
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(responseTime());
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

http.createServer(app).listen(config.HTTP_PORT, () => {
    debug('HTTP Server listening on port: %s, in %s mode', config.HTTP_PORT, app.get('env'));
});

debug('Creating HTTPS server on port: %s', config.HTTPS_PORT);
https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'server/keys', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'server/keys', 'server.crt')),
    ca: fs.readFileSync(path.join(__dirname, 'server/keys', 'ca.crt')),
    requestCert: true,
    rejectUnauthorized: false
}, app).listen(config.HTTPS_PORT, () => {
    debug('HTTPS Server listening on port: %s, in %s mode', config.HTTPS_PORT, app.get('env'));
});
