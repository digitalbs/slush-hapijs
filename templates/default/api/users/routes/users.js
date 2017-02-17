'use strict';

const bcrypt = require('bcrypt');
const Boom = require('boom');
const User = require('../model/User');
const userSchema = require('../schemas/userSchema');
const verifyUserCredentials = require('../util/userFunctions').verifyUserCredentials;
const verifyUniqueUser = require('../util/userFunctions').verifyUniqueUser;
const createToken = require('../util/token');
const Joi = require('joi');
const Promise = require('bluebird');

function _hashPassword(password) {
    return new Promise((resolve, reject) => {
        //generate a SALT level 10 strength
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                resolve(hash);
            });
        });
    });
}

module.exports = [{
    method: 'GET',
    path: '/users',
    config: {
        description: 'Get all users registered',
        notes: ['Gets all users in Database'],
        handler: (req, res) => {
            User
                .find()
                .select('-password -__v')
                .exec((err, users) => {
                    if (err) {
                        throw Boom.badRequest(err);
                    }

                    res(users).code(200);
                });
        },
        tags: ['api'],
        //authenticates route. Only admins can view this
        auth: {
            strategy: 'jwt',
            scope: 'admin'
        }
    }
}, {
    method: 'GET',
    path: '/users/{username}',
    config: {
        description: 'Get user by name',
        notes: ['Gets a users information by their name'],
        handler(req, res) {
            User
                .findOne({
                    username: req.params.username
                })
                .exec((err, user) => {
                    if (err) {
                        throw Boom.badRequest(err);
                    }

                    res(user || {}).code(200);
                });
        },
        tags: ['api'],
        validate: userSchema.getUser
    }
}, {
    method: 'POST',
    path: '/users',
    config: {
        description: 'Create a user',
        notes: ['This endpoint will create a user. Before the handler is hit to create a user, it will verify if the user exists. If they do, it will respond back with an error.'],
        pre: [{
            method: verifyUniqueUser
        }],
        handler: (req, res) => {
            let user = new User();
            user.username = req.payload.username;
            user.admin = false;

            _hashPassword(req.payload.password).then(hash => {
                user.password = hash;
                user.save((err, user) => {
                    if (err) {
                        throw Boom.badRequest(err);
                    }

                    //if user is saved successfully, issue a JWT
                    res({
                        username: user.username,
                        id_token: createToken(user)
                    }).code(201);
                });
            }).catch(err => {
                throw Boom.badRequest(err);
            });
        },
        auth: false,
        tags: ['api'],
        validate: userSchema.user
    }
}, {
    method: 'PUT',
    path: '/users/{username}',
    config: {
        description: 'Update a current user.',
        notes: ['Updates the targeted user in Database'],
        handler: (req, res) => {
            User
                .find({
                    username: req.params.username
                }, (err, user) => {
                    user.username = req.payload.username;
                    user.password = req.payload.password;

                    return user.save((err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(user);

                        res().code(200);
                    });
                });
        },
        tags: ['api'],
        validate: userSchema.updateUser
    }
}, {
    method: 'DELETE',
    path: '/users/{username}',
    config: {
        description: 'Delete a user.',
        notes: ['Removes the User from the database'],
        handler: (req, res) => {
            User
                .find({
                    username: req.params.username
                })
                .remove(() => {
                    console.log('removed user');
                    res().code(204);
                });
        },
        tags: ['api'],
        validate: userSchema.deleteUser
    }
}, {
    method: 'POST',
    path: '/users/authenticate',
    config: {
        description: 'Authenticates User',
        notes: ['Authenticates the User. If user is authorized, a JWT is returned for use to make other API calls'],
        //before route handler runs, verify user is unique
        pre: [{
            method: verifyUserCredentials,
            assign: 'user'
        }],
        handler: (req, res) => {
            res({
                id_token: createToken(req.pre.user)
            }).code(201);
        },
        tags: ['api'],
        auth: false,
        validate: userSchema.user
    }
}];
