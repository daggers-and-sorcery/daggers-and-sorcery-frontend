'use strict';

module.exports = {
    name: 'item-journal',
    url: '/journal/item',
    template: require('partial/main/journal/item-journal.html'),
    resolve: {
        journalInfo: function ($http, $stateParams) {
            return $http.get('https://api.daggersandsorcery.com/journal/list/item');
        }
    },
    controller: require('js/controller/journal/item-journal-controller.js')
};