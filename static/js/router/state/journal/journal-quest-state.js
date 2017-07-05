'use strict';

module.exports = {
    name: 'journal.journal-quest',
    url: 'quest',
    template: require('partial/main/journal/journal-quest.html'),
    resolve: {
        journalInfo: function ($http, $stateParams) {
            return $http.get('https://api.daggersandsorcery.com/journal/list/quest')
                .then(function (response) {
                    return response.data.data;
                });
    }
    },
    controller: require('js/controller/journal/journal-quest-controller.js')
};