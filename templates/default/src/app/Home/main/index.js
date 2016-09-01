'use strict';

import template from './index.html';

/**
 * @module boilerplateApp.main
 * @class HomeMainCtrl
 * @constructor
 */
class HomeMainCtrl {
    constructor () {}
}

export default {
    templateUrl: template,
    bindings: {},
    controllerAs: 'ctrl',
    controller: HomeMainCtrl
};

HomeMainCtrl.$inject = [];
