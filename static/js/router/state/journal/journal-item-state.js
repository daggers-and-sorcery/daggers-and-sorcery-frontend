'use strict';

module.exports = {
    name: 'journal.journal-item',
    url: 'item',
    template: require('partial/main/journal/journal-item.html'),
    resolve: {
        journalInfo: function ($http, $stateParams) {
            return $http.get('https://api.daggersandsorcery.com/journal/list/item')
                .then(function (response) {
                    return response.data.data;
                });
        }
    },
    controller: require('js/controller/journal/journal-item-controller.js')
};