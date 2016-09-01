'use strict';

//Vendors
import vendors from './config/app.vendors';

//<%= appName %> Modules
import modules from './config/app.modules';

//Configuration
import constants from './config/app.constants';
import langConfig from './config/app.lang';

//Routing
import routing from './routing';

const modulesToLoad = modules.concat(vendors);

angular.module('<%= appName %>', modulesToLoad)
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$logProvider', '$locationProvider', 'DEBUG_MODE', 'HTML5_HISTORY', function ($stateProvider, $urlRouterProvider, $httpProvider, $logProvider, $locationProvider, DEBUG_MODE, HTML5_HISTORY) {
        
        $logProvider.debugEnabled(DEBUG_MODE);
        $locationProvider.html5Mode(HTML5_HISTORY);
        
        routing($stateProvider);
        
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.when('/', ['$state', function ($state) {
            $state.go('app');
        }]);
        
        $urlRouterProvider.otherwise('/');
    }])
    .config(langConfig)
    .constant(constants);
