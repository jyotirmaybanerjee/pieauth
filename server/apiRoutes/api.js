import _ from 'lodash';
import util from 'util';
import path from 'path';
import bcrypt from 'bcryptjs';

const debug = require('debug')('app:routes:api' + process.pid);
const Router = require("express").Router;
const UnauthorizedAccessError = require(path.join(__dirname, "..", "errors", "UnauthorizedAccessError.js"));
const User = require(path.join(__dirname, "..", "models", "User.js"));

const authenticate = (req, res, next) => {

  debug('Processing authenticate middleware');
  let username = req.body.username;
  let password = req.body.password;
  debug('Authenticating user %s with password %s', username, password);
  if (_.isEmpty(username) || _.isEmpty(password)) {
    return next(new UnauthorizedAccessError("401", {
      message: 'Invalid username or password'
    }));
  } else {
    debug('valid credentials');

    User.findOne({
      username: username
    }, (err, user) => {
      debug('found username');

      if (err || !user) {
        debug('could not find username');
        return next(new UnauthorizedAccessError("401", {
          message: 'Invalid username or password'
        }));
      }
      debug('found username');
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch && !err) {
          debug("User authenticated");
          req.user = {
            _id: user._id,
            username: user.username
          }
          next();
        } else {
          debug('wrong username or password');
          return next(new UnauthorizedAccessError("401", {
            message: 'Invalid username or password'
          }));
        }
      });
    });
  }
};

const create = (req, res, next) => {
  debug("Processing create middleware");
  let username = req.body.username;
  let password = req.body.password;
  if (_.isEmpty(username) || _.isEmpty(password)) {
    return next(new Error('Missing required fields.'));
  }
  process.nextTick( () => {
    let user = new User({
      username: username,
      password: password
    });
    user.save( (err, user) => {
      if (err) {
        console.log(err);
        if(err.code == '11000') {
          delete req.user;
          return next(new Error('User already exists.'));
        } else {
          return next(err);
        }
      } else {
        req.user = {
          _id: user._id,
          username: user.username
        }
        next();
      }
    });
  });
};

module.exports = () => {

  let router = new Router();

  router.route("/login").post(authenticate, (req, res, next) => {
    debug('logging in');
    return res.status(200).json(req.user);
  });

  router.route("/register").post(create, (req, res, next) => {
    debug("registering new user. created.");
    return res.status(200).json(req.user);
  });

  router.unless = require("express-unless");
  return router;
};

debug("Api Loaded");
