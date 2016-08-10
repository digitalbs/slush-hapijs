'use strict';

import mainTemplate from './index.html';

/**
 * @module boilerplateApp.main
 * @class HomeMainCtrl
 * @constructor
 */
export default function HomeMainCtrl() {
    this.title = 'Boilerplate';
}

export default {
    templateUrl: mainTemplate,
    bindings: {},
    controllerAs: 'ctrl',
    controller: HomeMainCtrl
};

HomeMainCtrl.$inject = [];
