'use strict';

module.exports = {
    name: 'journal-entry.journal-entry-item',
    url: 'item/:entryId',
    resolve: {
        journalEntryInfo: function ($http, $stateParams) {
            return $http.get('https://api.daggersandsorcery.com/journal/entry/item/' + $stateParams.entryId)
                .then(function (response) {
                    return response.data.data;
                });
        }
    },
    template: require('partial/main/journal/entry/journal-entry-item.html'),
    controller: require('js/controller/journal/entry/journal-entry-item-controller.js')
};