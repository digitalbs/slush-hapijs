'use strict';

const Joi = require('joi');

const createUserSchema = Joi.object({
    username: Joi.string().min(2).max(30).required(),
    password: Joi.string().required()
});

module.exports = createUserSchema;
