'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const config = require('./config');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const HapiAuthJWT = require('hapi-auth-jwt2');
const pack = require('./package');
const verifyUserCredentials = require('./api/users/util/userFunctions').validate;

const server = new Hapi.Server({
    port: '<%= portNumber %>',
    routes: {
        cors: true
    }
});


server.realm.modifiers.route.prefix = '<%= apiPrefix %>';

const dbUrl = 'mongodb://localhost:27017/<%= databaseName %>';
const swaggerOptions = {
    basePath: '<%= apiPrefix %>',
    securityDefinitions: {
        'jwt': {
            'type': 'apiKey',
            'name': 'Authorization',
            'in': 'header'
        }
    },
    security: [{
        'jwt': []
    }],
    info: {
        'title': '<%= apiName %> API Documentation',
        'version': pack.version
    },
    tags: [{
        'name': 'users',
        'description': 'Users API Resources. Supports CRUD'
    }]
};

const validate = async function (decoded, request) {
    return verifyUserCredentials(decoded).then((validation) => {
        return validation;
    });
};

const init = async function () {
    await server.register([
        HapiAuthJWT,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }]);

    //Hapi Auth Strategy with name and scheme of JWT
    server.auth.strategy('jwt', 'jwt', {
        key: config.secret,
        validate: validate,
        verifyOptions: {
            algorithms: ['HS256']
        }
    });

    server.auth.default('jwt');

    //create route for all in subdirectories of API
    glob.sync('api/**/routes/*.js', {
        root: __dirname
    }).forEach(file => {
        let route = require(path.join(__dirname, file));

        server.route(route);
    });

    //start up the server
    await server.start();

    return server;
};

init().then((server) => {
    //if server starts, connect to database
    mongoose.connect(dbUrl, {}, err => {
        console.log(`Now running on ${server.info.port}`);
    });
}).catch((err) => {
    console.log(err);
});

module.exports = server;
