'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../../../config').secret;

function createToken(user) {
    let scopes;

    //check if user object passed in
    //has admin set to true, if so set scopes to admin
    if (user.admin) {
        scopes = 'admin';
    }

    //sign JWT
    return jwt.sign({
        id: user._id,
        username: user.username,
        scope: scopes
    }, secret, {
        algorithm: 'HS256',
        expiresIn: '1h'
    });
}

module.exports = createToken;
