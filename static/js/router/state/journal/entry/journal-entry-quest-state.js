'use strict';

module.exports = {
    name: 'journal-entry.journal-entry-quest',
    url: 'quest/:entryId',
    resolve: {
        journalEntryInfo: function ($http, $stateParams) {
            return $http.get('https://api.daggersandsorcery.com/journal/entry/quest/' + $stateParams.entryId)
                .then(function (response) {
                    return response.data.data.journalEntryInfo;
                });
        }
    },
    template: require('partial/main/journal/entry/journal-entry-quest.html'),
    controller: require('js/controller/journal/entry/journal-entry-quest-controller.js')
};