'use strict';

module.exports = require('js/app.js').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state(require('js/router/state/index-state.js'))
        .state(require('js/router/state/character-state.js'))
        .state(require('js/router/state/journal-state.js'))
        .state(require('js/router/state/journal-entry-state.js'))
        .state(require('js/router/state/map-state.js'))
        .state(require('js/router/state/explore-state.js'))
        .state(require('js/router/state/logout-state.js'))
        .state(require('js/router/state/registration-state.js'))
        .state(require('js/router/state/shop-state.js'))
        .state(require('js/router/state/settings-state.js'))
        .state(require('js/router/state/spellpage-state.js'))
        .state(require('js/router/state/prelude-state.js'))
        .state(require('js/router/state/skill/scavenging-state.js'))
        .state(require('js/router/state/skill/cooking-state.js'))
        .state(require('js/router/state/skill/leatherworking-state.js'))
        .state(require('js/router/state/inn-state.js'))
        .state(require('js/router/state/inn-services-state.js'))
        .state(require('js/router/state/ladder-state.js'))
        .state(require('js/router/state/home-state.js'));
});