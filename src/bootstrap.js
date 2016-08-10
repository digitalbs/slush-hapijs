import angular from 'angular';
import './app/app';

angular.element(document).ready(() => {
    angular.bootstrap(document, ['boilerplateApp'], {
        strictDi: true
    });
});
