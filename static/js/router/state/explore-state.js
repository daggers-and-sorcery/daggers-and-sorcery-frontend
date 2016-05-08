'use strict';

module.exports = {
    name: 'explore',
    url: '/explore/',
    params: {
        'explorationId': null,
        'nextStage': null,
        'explorationInfo': null
    },
    template: require('partial/main/explore.html'),
    resolve: {
        explorationResult: function ($http, $stateParams) {
            console.log($stateParams)
            if($stateParams.explorationInfo != null) {
                return $stateParams.explorationInfo;
            }

            if ($stateParams.nextStage == null) {
                return $http.get('http://api.daggersandsorcery.com/explore/').then(function (response) {
                    return response.data.data;
                });
            } else {
                return $http.get('http://api.daggersandsorcery.com/explore/' + $stateParams.nextStage).then(function (response) {
                    return response.data.data;
                });
            }
        }
    },
    controller: require('js/controller/explore-controller.js')
};