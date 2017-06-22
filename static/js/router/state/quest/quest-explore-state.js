'use strict';

module.exports = {
    name: 'quest-explore',
    url: '/quest/explore/',
    params: {
        'questId': null,
        'nextStage': null
    },
    template: require('partial/main/explore.html'),
    resolve: {
        explorationResult: function ($http, $stateParams) {
            if($stateParams.nextStage == null) {
                return $http.get('https://api.daggersandsorcery.com/explore/quest/info/' + $stateParams.questId).then(function (response) {
                    return response.data.data;
                });
            } else {
                return $http.get('https://api.daggersandsorcery.com/explore/quest/' + $stateParams.questId+'/'+$stateParams.nextStage).then(function (response) {
                    return response.data.data;
                });
            }
        }
    },
    controller: require('js/controller/quest/quest-explore-controller.js')
};