'use strict';

const Boom = require('boom');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

async function findUser (userNameToMatch) {
    const user = await User.findOne({
        $or: [{
            username: userNameToMatch
        }]
    });

    return user;
}

async function _verifyUniqueUser(req, h) {
    //Find entry in database that matches
    return findUser(req.payload.username).then((user) => {
        if (user) {
            if (user.username === req.payload.username) {
                return Boom.badRequest('usernameTaken');
            }
        }

        return req.payload;
    }).catch((err) => {
        throw Boom.badRequest(err);
    });
}

async function _verifyUserCredentials(req, h) {
    return findUser(req.payload.username).then((user) => {
        if (user) {
            return new Promise ((resolve, reject) => {
                bcrypt.compare(req.payload.password, user.password, (err, isValid) => {
                    if (isValid) {
                        resolve(user);
                    } else {
                        reject(Boom.badRequest('incorrectPassword'));
                    }
                });
            });
        } else {
            return Boom.badRequest('incorrectCredentials');
        }
    }).catch((err) => {
        throw Boom.badRequest(err);
    });
}

async function _validate (decodedPayload) {
    return findUser(decodedPayload.username).then((user) => {
        if (!user) {
            return { isValid: false };
        } else {
            return { isValid: true };
        }
    }).catch((err) => {
        throw Boom.badRequest(err);
    });
}

module.exports = {
    verifyUniqueUser: _verifyUniqueUser,
    verifyUserCredentials: _verifyUserCredentials,
    validate: _validate
};
