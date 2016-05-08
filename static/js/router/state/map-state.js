'use strict';

module.exports = {
    name: 'map',
    url: '/map/',
    template: require('partial/main/map.html'),
    resolve: {
        explorationInfo: function ($http) {
            return $http.get('http://api.daggersandsorcery.com/explore/info').then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: function ($scope, $state, explorationInfo) {
        if(explorationInfo.events.length > 0) {
            $state.go('explore', {'explorationInfo': explorationInfo});
        }

        $scope.explore = function(explorationId) {
            $state.go('explore', {'explorationId': explorationId, 'nextStage': 0});
        }
    }
};