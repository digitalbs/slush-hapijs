(function() {
    'use strict';

    let tests = [];
    for (let file in window.__karma__.files) {
        if (window.__karma__.files.hasOwnProperty(file)) {
            if (/^\/base\/spec\//i.test(file) && /Spec\.js$/.test(file)) {
                tests.push(file);
            }
        }
    }

    let smUtil = {};

    smUtil.overrideDirective = function overrideDirective($provide, name, options) {
        let serviceName;
        if (options === null) {
            options = {};
        }
        serviceName = name + 'Directive';
        return $provide.factory(serviceName, () => {
            let directive;
            directive = angular.copy(options);

            if (directive.priority === null) {
                directive.priority = 0;
            }
            directive.name = name;
            if ((directive.require === null) && (directive.controller !== null)) {
                directive.require = directive.name;
            }
            directive.$$bindings = {
                bindToController: directive.bindToController || null
            };
            return [directive];
        });
    };

    window.smUtil = smUtil;

    function describeEach(description, cases, callback) {
        let index = 0;
        cases.forEach(value => {
            let descriptionEdit = description.replace(/\{value\}/gi, String(value));
            descriptionEdit = descriptionEdit.replace(/\{index\}/gi, index);

            describe(descriptionEdit, () => {
                callback(value, index);
            });
            index++;
        });
    }

    window.describeEach = describeEach;

}());
