'use strict';

const Joi = require('joi');

const userSchema = {
    user: {
        payload: {
            username: Joi.string().min(2).max(30).required().description('Name of the user for the API'),
            password: Joi.string().required().description('Password for the user')
        }
    },
    deleteUser: {
        params: {
            username: Joi.string()
                .required()
                .description('name of the user being removed')
        }
    },
    getUser: {
        params: {
            username: Joi.string()
                .required()
                .description('name of the user being selected')
        }
    },
    updateUser: {
        params: {
            username: Joi.string()
                .required()
                .description('name of the user being updated')
        },
        payload: {
            username: Joi.string().min(2).max(30).required().description('Name of the user for the API'),
            password: Joi.string().required().description('Password for the user')
        }
    }
};

module.exports = userSchema;
