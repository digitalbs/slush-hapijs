'use strict';

const Joi = require('joi');

const <%= routeName %>Schema = {
    delete<%= capRouteName %>: {
        params: {
            id: Joi.string()
                .required()
                .description('id of the <%= routeName %> being removed')
        }
    },
    get<%= capRouteName %>: {
        params: {
            id: Joi.string()
                .required()
                .description('id of the <%= routeName %> getting selected')
        }
    },
    post<%= capRouteName %>: {
        payload: {
            name: Joi.string().min(2).max(30).required().description('Name of the <%= routeName %> for the API'),
            description: Joi.string().description('Description for the <%= routeName %>')
        }
    },
    update<%= capRouteName %>: {
        params: {
            id: Joi.string()
                .required()
                .description('id of the <%= routeName %> being added')
        },
        payload: {
            name: Joi.string().min(2).max(30).required().description('Name of the <%= routeName %> for the API'),
            description: Joi.string().description('Description for the <%= routeName %>')
        }
    }
};

module.exports = <%= routeName %>Schema;
