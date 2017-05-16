'use strict';

module.exports = {
    name: 'journal-entry.journal-entry-monster',
    url: 'monster/:entryId',
    resolve: {
        journalEntryInfo: function ($http, $stateParams) {
            return $http.get('https://api.daggersandsorcery.com/journal/entry/monster/' + $stateParams.entryId)
                .then(function (response) {
                    return response.data.data;
                });
        }
    },
    template: require('partial/main/journal/entry/journal-entry-monster.html'),
    controller: require('js/controller/journal/entry/journal-entry-monster-controller.js')
};