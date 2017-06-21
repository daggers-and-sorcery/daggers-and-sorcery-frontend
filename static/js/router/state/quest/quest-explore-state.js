'use strict';

module.exports = {
    name: 'quest-explore',
    url: '/quest/explore/',
    params: {
        'questId': null
    },
    template: require('partial/main/explore.html'),
    resolve: {
        explorationResult: function ($http, $stateParams) {
            return $http.get('https://api.daggersandsorcery.com/explore/quest/info/' + $stateParams.questId).then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/quest/quest-explore-controller.js')
};