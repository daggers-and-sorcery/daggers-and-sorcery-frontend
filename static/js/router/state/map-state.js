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
    controller: function ($scope, $state, explorationInfo, webStorage) {
        if (explorationInfo.events.length > 0) {
            $state.go('explore', {'explorationInfo': explorationInfo});
        }

        $scope.getExplorationImage = function (imageId) {
            return require('image/exploration/' + imageId + '.png');
        };

        $scope.exploreLast = function () {
            $state.go('explore', {
                'explorationId': 0,
                'nextStage': 0,
                'nextLocation': webStorage.get('lastExplorationTarget')
            });
        };

        $scope.hasLast = function () {
            return webStorage.get('lastExplorationTarget') != undefined;
        };

        $scope.dataForLast = function () {
            var result = undefined;

            $scope.explorationData.location.exploration.forEach(function(entry) {
                if(entry.id[0] === webStorage.get('lastExplorationTarget')[0]) {
                    result = entry;
                }
            });

            return result;
        };

        $scope.explore = function (explorationLocation, explorationId) {
            webStorage.set('lastExplorationTarget', explorationLocation);

            $state.go('explore', {'explorationId': explorationId, 'nextStage': 0, 'nextLocation': explorationLocation});
        };

        $scope.switchDescription = function (index) {
            $scope.explorationData.location.exploration[index].showfull = !$scope.explorationData.location.exploration[index].showfull;
        };

        $scope.explorationData = require('data/explore/sevgard.xml');

        console.log($scope.explorationData);
    }
};