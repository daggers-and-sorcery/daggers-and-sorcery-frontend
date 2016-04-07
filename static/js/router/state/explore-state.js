'use strict';

module.exports = {
    name: 'explore',
    url: '/explore/',
    params: {
        'explorationId': null
    },
    template: require('partial/main/explore.html'),
    resolve: {
        explorationResult: function ($http, $stateParams) {
            console.log($stateParams.explorationId);

            return $http.get('http://api.daggersandsorcery.com/explore/').then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/explore-controller.js')
};