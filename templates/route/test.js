'use strict';

const Code = require('code');
const Lab = require('lab');
const expect = Code.expect;
const lab = exports.lab = Lab.script();
const User = require('../../api/<%= routeName %>/model/<%= capRouteName %>');
const sinon = require('sinon');

//BDD
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;

//pull in hapi server
const Server = require('../../server.js');
let apiResponse = null;

describe('<%= capRouteName %>: ', () => {
    it('will create a <%= routeName %>', (done) => {
        const testPayload = {
            name: 'some name',
            description: 'some description'
        };

        const request = {
            method: 'POST',
            url: '<%= apiPrefix %>/<%= routeName %>',
            payload: testPayload
        };

        Server.inject(request, (response) => {
            expect(response.statusCode).to.equal(201);
            expect(response.result.name).to.equal(testPayload.name);

            done();
        });
    });

    it('will return back a list of <%= routeName %>', (done) => {
        const request = {
            method: 'GET',
            url: '<%= apiPrefix %>/<%= routeName %>'
        };

        Server.inject(request, (response) => {
            apiResponse = response.result;
            expect(response.statusCode).to.equal(200);

            done();
        });
    });

    it('will delete a <%= routeName %>', (done) => {
        const request = {
            method: 'DELETE',
            url: '<%= apiPrefix %>/<%= routeName %>/' + apiResponse[0]._id
        };

        Server.inject(request, (response) => {

            expect(response.statusCode).to.equal(204);

            done();
        });
    });
});
