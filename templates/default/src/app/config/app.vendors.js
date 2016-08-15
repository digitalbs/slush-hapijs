'use strict';

//Vendors
import 'angular-ui-router';
import 'angular-resource';
import 'angular-animate';
import 'angular-moment/angular-moment';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-mocks';
import 'angular-moment/angular-moment';
import 'angular-translate/dist/angular-translate';
import 'angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat';
import 'ng-focus-if';
import 'angular-cookies';
import 'angularLocalStorage/dist/angularLocalStorage.min';
<% if(materialize) { %>
import 'angular-aria';
import 'angular-material';
<% } %>

let vendorModules = [
    'ui.router',
    'ngResource',
    'ngMessages',
    'pascalprecht.translate',
    'angularMoment',
    'ngSanitize',
    'ngAnimate',
    'ngCookies',
    'angularLocalStorage',
    <% if (materialize) { %>
    'ngMaterial',
    <% } %>
    'focus-if'
];

export default vendorModules;
