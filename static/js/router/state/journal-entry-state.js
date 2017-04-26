'use strict';

module.exports = {
    name: 'journal_entry',
    url: '/journal/:type/:entryId',
    template: require('partial/main/journal_entry.html'),
    resolve: {
        journalEntryInfo: function ($http, $stateParams) {
            return $http({method: 'GET', url: 'https://api.daggersandsorcery.com/journal/entry/' + $stateParams.type + '/' + $stateParams.entryId});
        }
    },
    controller: require('js/controller/journal-entry-controller.js')
};