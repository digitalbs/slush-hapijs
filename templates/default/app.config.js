const envReqIsSilent = process.env.NODE_ENV === 'production';

require('dotenv').config({ silent: envReqIsSilent });

module.exports = {
    development: {
        LOG_DEBUG: false,
        HTML5_HISTORY: false,
        DEFAULT_LANG: 'en_us',
        API_URL: process.env.API_URL || '<%= apiURL %>'
    },
    production: {
        LOG_DEBUG: false,
        HTML5_HISTORY: false,
        API_URL: '<%= apiURL %>'
    }
};
