'use strict';

//Vendors
import 'angular-ui-router';
import 'angular-resource';
import 'angular-animate';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-mocks';
import 'angular-moment/angular-moment';
import 'angular-translate/dist/angular-translate';
import 'angular-cookies';
import 'angular-aria';
<% if(materialize) { %>
import 'angular-material';
<% } %>

let vendorModules = [
    'ui.router',
    'ngResource',
    'ngMessages',
    'pascalprecht.translate',
    'ngSanitize',
    'ngAnimate',
    'ngCookies',
    <% if (materialize) { %>
    'ngMaterial'
    <% } %>
];

export default vendorModules;
