'use strict';

//Vendors
import vendors from './config/app.vendors';

//<%= appName %> Modules
import modules from './config/app.modules';

//Configuration
import config from './config/app.config';

//Routing
import routing from './routing';

//Language
import englishUS from '../i18n/lang/en-us';

// Vendors CSS
/* NOTE: it is recommended to load css via scss @import <location>, however,
 if the css includes url paths to assets, but no url path override variable,
 it should be loaded here so webpack picks it up.
 */
const modulesToLoad = modules.concat(vendors);

angular.module("<%= appName %>", modulesToLoad)
    .config(["$stateProvider", "$urlRouterProvider", "$httpProvider", "$logProvider", function($stateProvider, $urlRouterProvider, $httpProvider, $logProvider) {

        $logProvider.debugEnabled(config.debug);

        routing($stateProvider);


        $urlRouterProvider.when("", "/");
        $urlRouterProvider.when("/", ['$state', function($state) {
            $state.go("app");
        }]);

        $urlRouterProvider.otherwise("/");
    }])
    .config(["$translateProvider", function($translateProvider) {
        $translateProvider.useMessageFormatInterpolation();
        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.translations("en-us", englishUS);
        $translateProvider.preferredLanguage("en-us");
    }])
    .constant("API_URL", config.API_URL);
