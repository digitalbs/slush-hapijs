'use strict';

const Boom = require('boom');
const User = require('../model/User');
const bcrypt = require('bcrypt');

function _verifyUniqueUser(req, res) {
    //Find entry in database that matches
    User.findOne({
        $or: [{
            username: req.payload.username
        }]
    }, (err, user) => {
        if (user) {
            if (user.username === req.payload.username) {
                res(Boom.badRequest('usernameTaken'));
            }
        }

        //If everything is good, send back to the API method handler
        res(req.payload);
    });
}

function _verifyUserCredentials(req, res) {
    User.findOne({
        $or: [{
            username: req.payload.username
        }]
    }, (err, user) => {
        if (user) {
            bcrypt.compare(req.payload.password, user.password, (err, isValid) => {
                if (isValid) {
                    res(user);
                } else {
                    res(Boom.badRequest('incorrectPassword'));
                }
            });
        } else {
            res(Boom.badRequest('incorrectCredentials'));
        }
    });
}

module.exports = {
    verifyUniqueUser: _verifyUniqueUser,
    verifyUserCredentials: _verifyUserCredentials
};
