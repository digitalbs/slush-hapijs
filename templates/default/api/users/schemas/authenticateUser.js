'use strict';

const Joi = require('joi');

const authenticateUserSchema = Joi.alternatives().try(
    Joi.object({
        username: Joi.string().min(2).max(30).required(),
        password: Joi.string().required()
    })
);

module.exports = authenticateUserSchema;
