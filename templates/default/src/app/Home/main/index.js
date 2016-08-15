'use strict';

import mainTemplate from './index.html';

/**
 * @module boilerplateApp.main
 * @class HomeMainCtrl
 * @constructor
 */
export default function HomeMainCtrl() {}

export default {
    templateUrl: mainTemplate,
    bindings: {},
    controllerAs: 'ctrl',
    controller: HomeMainCtrl
};

HomeMainCtrl.$inject = [];
