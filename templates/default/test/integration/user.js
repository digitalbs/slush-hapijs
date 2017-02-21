'use strict';

const Code = require('code');
const Lab = require('lab');
const expect = Code.expect;
const lab = exports.lab = Lab.script();
const User = require('../../api/users/model/User');

//BDD
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;

const testUser = {
    username: 'test',
    password: 'password'
};
let jwtToken;
let adminJwtToken;

//pull in hapi server
const Server = require('../../server.js');

describe('User: ', () => {
    it('will create a user', (done) => {
        const request = {
            method: 'POST',
            url: '<%= apiPrefix %>/users',
            payload: testUser
        };

        Server.inject(request, (response) => {
            expect(response.statusCode).to.equal(201);
            expect(response.result.username).to.equal(testUser.username);

            done();
        });
    });

    it('will create another user for admin purposes', (done) => {
        const request = {
            method: 'POST',
            url: '<%= apiPrefix %>/users',
            payload: {
                username: 'testAdmin',
                password: 'pass'
            }
        };

        Server.inject(request, (response) => {
            expect(response.statusCode).to.equal(201);

            done();
        });
    });

    it('will authenticate a regular user', (done) => {
        const request = {
            method: 'POST',
            url: '<%= apiPrefix %>/users/authenticate',
            payload: testUser
        };

        Server.inject(request, (response) => {
            expect(response.statusCode).to.equal(201);
            jwtToken = response.result.id_token;

            done();
        });
    });

    it('will return back as unauthorized if accessing without an admin account', (done) => {
        const request = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            url: '<%= apiPrefix %>/users'
        };

        Server.inject(request, (response) => {
            expect(response.statusCode).to.equal(403);

            done();
        });
    });

    it('will authenticate the admin user', (done) => {
        User
            .update({
                username: 'testAdmin'
            }, {
                admin: true
            }).exec();

        const request = {
            method: 'POST',
            url: '<%= apiPrefix %>/users/authenticate',
            payload: {
                username: 'testAdmin',
                password: 'pass'
            }
        };

        Server.inject(request, (response) => {
            expect(response.statusCode).to.equal(201);
            adminJwtToken = response.result.id_token;

            done();
        });
    });

    it('will get a an admin by user name', (done) => {
        const request = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${adminJwtToken}`
            },
            url: `<%= apiPrefix %>/users/testAdmin`
        };

        Server.inject(request, (response) => {
            expect(response.statusCode).to.equal(200);
            expect(response.result.username).to.equal('testAdmin');

            done();
        });
    });

    it('will return back a list of users if it is an admin user', (done) => {
        const request = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${adminJwtToken}`
            },
            url: '<%= apiPrefix %>/users'
        };

        Server.inject(request, (response) => {
            expect(response.statusCode).to.equal(200);

            done();
        });
    });

    it('will get a user by user name', (done) => {
        const request = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            url: `<%= apiPrefix %>/users/${testUser.username}`
        };

        Server.inject(request, (response) => {
            expect(response.statusCode).to.equal(200);
            expect(response.result.username).to.equal(testUser.username);

            done();
        });
    });

    it('will delete a regular user by their user name', (done) => {
        const request = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            url: `<%= apiPrefix %>/users/${testUser.username}`
        };

        Server.inject(request, (response) => {
            expect(response.statusCode).to.equal(204);

            done();
        });
    });

    it('will delete an admin user by their name', (done) => {
        const request = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${adminJwtToken}`
            },
            url: '<%= apiPrefix %>/users/testAdmin'
        };

        Server.inject(request, (response) => {
            expect(response.statusCode).to.equal(204);

            done();
        });
    });
});
