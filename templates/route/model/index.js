'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const <%= routeName %>Model = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('<%= routeName %>', <%= routeName %>Model);
