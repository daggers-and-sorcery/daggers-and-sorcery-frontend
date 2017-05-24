'use strict';

module.exports = {
    name: 'journal.journal-monster',
    url: 'monster',
    template: require('partial/main/journal/journal-monster.html'),
    resolve: {
        journalInfo: function ($http, $stateParams) {
            return $http.get('https://api.daggersandsorcery.com/journal/list/monster')
                .then(function (response) {
                    return response.data.data;
                });
        }
    },
    controller: require('js/controller/journal/journal-monster-controller.js')
};