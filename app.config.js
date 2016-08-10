require('dotenv').config();

module.exports = {
    development: {
        html5Routing: false,
        debug: true,
        urlPrefix: "#",
        API_URL: process.env.API_URL || "http://SOME-API"
    },
    production: {
        html5Routing: true,
        debug: false,
        urlPrefix: "",
        API_URL: "http://SOME-API"
    }
};
