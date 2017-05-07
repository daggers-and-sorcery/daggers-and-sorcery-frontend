'use strict';

module.exports = {
    name: 'monster-journal',
    url: '/journal/monster',
    template: require('partial/main/journal/monster-journal.html'),
    resolve: {
        journalInfo: function ($http, $stateParams) {
            return $http.get('https://api.daggersandsorcery.com/journal/list/monster');
        }
    },
    controller: require('js/controller/journal/monster-journal-controller.js')
};