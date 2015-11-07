import _ from 'lodash';
import util from 'util';
import path from 'path';
import bcrypt from 'bcryptjs';

const debug = require('debug')('app:routes:api' + process.pid);
const Router = require("express").Router;
const UnauthorizedAccessError = require(path.join(__dirname, "..", "errors", "UnauthorizedAccessError.js"));
const User = require(path.join(__dirname, "..", "models", "User.js"));
const Contact = require(path.join(__dirname, "..", "models", "Contact.js"));

const authenticate = (req, res, next) => {

  let username = req.body.username;
  let password = req.body.password;
  if (_.isEmpty(username) || _.isEmpty(password)) {
    return next(new UnauthorizedAccessError("401", {
      message: 'Invalid username or password'
    }));
  } else {

    User.findOne({
      username: username
    }, (err, user) => {

      if (err || !user) {
        return next(new UnauthorizedAccessError("401", {
          message: 'Invalid username or password'
        }));
      }
      debug('found username');
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch && !err) {
          req.user = {
            _id: user._id,
            username: user.username
          }
          next();
        } else {
          return next(new UnauthorizedAccessError("401", {
            message: 'Invalid username or password'
          }));
        }
      });
    });
  }
};

const create = (req, res, next) => {
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

const getContacts = (req, res, next) => {

  process.nextTick( () => {
    Contact.find( (err, contacts) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        req.contacts = contacts;
        next();
      }
    });
  });
};

const saveContact = (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  if (_.isEmpty(name)) {
    return next(new Error('Missing required fields.'));
  }
  process.nextTick( () => {

    Contact.find({}, 'id -_id').sort({id: -1}).exec(function(err, docs) {
      let newId = docs[0].id + 1;
      let contact = new Contact({
        id: newId,
        name: name,
        email: email,
        phone: phone
      });
      contact.save( (err, contacts) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          next();
        }
      });
    });
  });
};

module.exports = () => {

  let router = new Router();

  router.route("/login").post(authenticate, (req, res, next) => {
    return res.status(200).json(req.user);
  });

  router.route("/register").post(create, (req, res, next) => {
    return res.status(200).json(req.user);
  });

  let person = router.route("/persons");

  person.get(getContacts, (req, res, next) => {
    debug("fetching entile contact list.");
    return res.status(200).json(req.contacts);
  });

  person.post(saveContact, getContacts,  (req, res, next) => {
    return res.status(200).json(req.contacts);
  });

  // person.delete(deleteContact, (req, res, next) => {
  //   debug("saving new contact.");
  //   return res.status(200).json(req.contacts);
  // });

  router.unless = require("express-unless");
  return router;
};

debug("Api Loaded");
