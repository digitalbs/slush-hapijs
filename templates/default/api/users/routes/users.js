'use strict';

const bcrypt = require('bcryptjs');
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
        handler: async (req, h) => {
            const users = await User
                .find()
                .select('-password -__v')
                .exec().then((users) => {
                    return users;
                }).catch((err) => {
                    throw Boom.badRequest(err);
                });

            return users;
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
        handler: async (req, h) => {
            const user = User
                .findOne({
                    username: req.params.username
                })
                .exec().then((user) => {
                    return user;
                }).catch((err) => {
                    throw Boom.badRequest(err);
                });

            return user;
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
        handler: async (req, h) => {
            let user = new User();
            user.username = req.payload.username;
            user.admin = req.payload.admin;

            return _hashPassword(req.payload.password).then(hash => {
                user.password = hash;

                const saveUser = async function () {
                    try {
                        const newUser = await user.save();

                        return {
                            username: newUser.username,
                            id_token: createToken(newUser)
                        };
                    } catch (err) {
                        throw Boom.badRequest(err);
                    }
                }

                return saveUser();
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
        handler: async (req, h) => {
            const updatedUser = User.where({
                    username: req.params.username
                }).update(req.payload).then((updatePayload) => {
                    return updatePayload;
                }).catch(err => {
                    throw Boom.badRequest(err);
                });
            
            return updatedUser;
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
        handler: async (req, h) => {
            const deletedUser = await User
                .find({
                    username: req.params.username
                })
                .remove().then(() => {
                    console.log('removed user');
                    return h.response().code(204);
                });
            
            return deletedUser;
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
        handler: async (req, h) => {
            return {
                id_token: createToken(req.pre.user)
            };
        },
        tags: ['api'],
        auth: false,
        validate: userSchema.user
    }
}];
