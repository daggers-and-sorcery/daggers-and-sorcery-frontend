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
        },
        zoneInfo: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/zone/list/sevgard').then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: function ($scope, $state, explorationInfo, zoneInfo, webStorage) {
        $scope.zoneInfo = zoneInfo;

        if (explorationInfo.events.length > 0) {
            $state.go('explore', {'explorationInfo': explorationInfo});
        }

        $scope.getExplorationImage = function (imageId) {
            return require('image/exploration/' + imageId + '.png');
        };

        $scope.hasExplorationImage = function (imageId) {
            try {
                return __webpack_modules__[require.resolveWeak('image/exploration/' + imageId + '.png')];
            } catch (err) {
                return false;
            }
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

            $scope.zoneInfo.zones.forEach(function(entry) {
                if(entry.id === webStorage.get('lastExplorationTarget')) {
                    result = entry;
                }
            });

            return result;
        };

        $scope.explore = function (explorationLocation, explorationId) {
            webStorage.set('lastExplorationTarget', explorationLocation);

            $state.go('explore', {'explorationId': explorationId, 'nextStage': 0, 'nextLocation': explorationLocation});
        };
    }
};