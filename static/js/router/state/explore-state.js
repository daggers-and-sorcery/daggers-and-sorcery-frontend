'use strict';

module.exports = {
    name: 'explore',
    url: '/explore/',
    params: {
        'explorationId': null,
        'nextStage': null,
        'nextLocation': null,
        'explorationInfo': null
    },
    template: require('partial/main/explore.html'),
    resolve: {
        explorationResult: function ($http, $stateParams) {
            if ($stateParams.explorationInfo != null) {
                return $stateParams.explorationInfo;
            }

            return $http.get('http://api.daggersandsorcery.com/explore/' + $stateParams.nextLocation + '/' + $stateParams.nextStage).then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/explore-controller.js')
};