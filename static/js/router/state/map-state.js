'use strict';

module.exports = {
    name: 'map',
    url: '/map/',
    template: require('partial/main/map.html'),
    resolve: {
        explorationInfo: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/explore/info').then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: function ($scope, $state, explorationInfo) {
        if (explorationInfo.events.length > 0) {
            $state.go('explore', {'explorationInfo': explorationInfo});
        }

        $scope.getExplorationImage = function (imageId) {
            return require('image/exploration/' + imageId + '.png');
        };

        $scope.explore = function (explorationLocation, explorationId) {
            $state.go('explore', {'explorationId': explorationId, 'nextStage': 0, 'nextLocation': explorationLocation});
        };

        $scope.switchDescription = function (index) {
            $scope.explorationData.location.exploration[index].showfull = !$scope.explorationData.location.exploration[index].showfull;
        };

        $scope.explorationData = require('data/explore/sevgard.xml');
    }
};