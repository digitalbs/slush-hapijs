'use strict';

const Code = require('code');
const Lab = require('lab');
const expect = Code.expect;
const lab = exports.lab = Lab.script();

//BDD
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;

const testUser = {
    username: 'Baxter',
    password: 'Password'
};

//pull in hapi server
const Server = require('../../server.js');

describe('User: ', () => {
    it('will create a user', (done) => {
        const request = {
            method: 'POST',
            url: '/api/users',
            payload: JSON.stringify(testUser)
        };

        Server.inject(request, (response) => {
            expect(response.statusCode).to.equal(201);

            done();
        });
    });

    it('will authenticate user', (done) => {
        const request = {
            method: 'POST',
            url: '/api/users/authenticate',
            payload: JSON.stringify(testUser)
        };

        Server.inject(request, (response) => {
            expect(response.statusCode).to.equal(201);

            done();
        });
    });
});
