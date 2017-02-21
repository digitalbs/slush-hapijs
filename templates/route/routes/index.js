'use strict';

const bcrypt = require('bcrypt');
const Boom = require('boom');
const <%= capRouteName %> = require('../model/<%= capRouteName %>');
const <%= routeName%>Schema = require('../schemas/<%= routeName %>Schema');
const Joi = require('joi');
const Promise = require('bluebird');

module.exports = [{
    method: 'GET',
    path: '/<%= routeName %>',
    config: {
        description: 'Get all <%= routeName %>',
        notes: ['Gets all <%= routeName %> in Database'],
        handler: (req, res) => {
            <%= capRouteName %>
                .find()
                .exec((err, <%= routeName %>) => {
                    if (err) {
                        throw Boom.badRequest(err);
                    }

                    res(<%= routeName %>).code(200);
                });
        },
        tags: ['api'],
        auth: false
    }
}, {
    method: 'GET',
    path: '/<%= routeName %>/{id}',
    config: {
        description: 'Get <%= routeName %> by id',
        notes: ['Gets a <%= routeName %> information by their id'],
        handler(req, res) {
            <%= capRouteName %>
                .findOne({
                    id: req.params.id
                })
                .exec((err, <%= routeName %>) => {
                    if (err) {
                        throw Boom.badRequest(err);
                    }

                    res(<%= routeName %> || {}).code(200);
                });
        },
        tags: ['api'],
        auth: false,
        validate: <%= routeName %>Schema.get<%= capRouteName %>
    }
}, {
    method: 'POST',
    path: '/<%= routeName %>',
    config: {
        description: 'Create a <%= routeName %>',
        notes: ['This endpoint will create a <%= routeName %>.'],
        handler: (req, res) => {
            let <%= routeName %> = new <%= capRouteName %>();

            <%= routeName %>.name = req.payload.name;
            <%= routeName %>.description = req.payload.description;

            <%= routeName %>.save((err, <%= routeName %>) => {
                if (err) {
                    throw Boom.badRequest(err);
                }

                res(<%= routeName %>).code(201);
            });
        },
        tags: ['api'],
        auth: false,
        validate: <%= routeName %>Schema.post<%= capRouteName %>
    }
}, {
    method: 'PUT',
    path: '/<%= routeName %>/{id}',
    config: {
        description: 'Update a current <%= routeName %>.',
        notes: ['Updates the targeted <%= routeName %> in Database'],
        handler: (req, res) => {
            <%= capRouteName %>
                .find({
                    id: req.params.id
                }, (err, <%= routeName %>) => {

                    return <%= routeName %>.save((err) => {
                        if (err) {
                            console.log(err);
                        }

                        res().code(200);
                    });
                });
        },
        tags: ['api'],
        auth: false,
        validate: <%= routeName %>Schema.update<%= capRouteName %>
    }
}, {
    method: 'PATCH',
    path: '/<%= routeName %>/{id}',
    config: {
        description: 'Update a current <%= routeName %>.',
        notes: ['Updates the targeted <%= routeName %> in Database'],
        handler: (req, res) => {
            <%= capRouteName %>
                .find({
                    id: req.params.id
                }, (err, <%= routeName %>) => {
                    //Do PATCH HERE
                });
        },
        tags: ['api'],
        auth: false,
        validate: <%= routeName %>Schema.update<%= capRouteName %>
    }
}, {
    method: 'DELETE',
    path: '/<%= routeName %>/{id}',
    config: {
        description: 'Delete a <%= routeName %>.',
        notes: ['Removes the <%= routeName %> from the database'],
        handler: (req, res) => {
            <%= capRouteName %>
                .find({
                    _id: req.params.id
                })
                .remove(() => {
                    console.log('removed <%= routeName %>');
                    res().code(204);
                });
        },
        tags: ['api'],
        auth: false,
        validate: <%= routeName %>Schema.delete<%= capRouteName %>
    }
}];
