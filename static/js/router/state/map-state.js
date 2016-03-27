'use strict';

module.exports = {
    name: 'map',
    url: '/map/',
    template: require('partial/main/map.html'),
    /*resolve: {
        position: function ($http) {
            return $http.get('http://api.daggersandsorcery.com/character/position').then(function(response) {
                return response.data.data;
            });
        }
    },*/
    controller: function ($scope, $http, $state) {
        /*$scope.position = position;
        $scope.objects = position.spawnList;

        $scope.move = function(direction) {
            var directionData = {
                'direction': direction
            };

            $http.post('http://api.daggersandsorcery.com/character/move', directionData).success(function (data, status, headers, config) {
                if(data.data.success) {
                    $scope.$broadcast('position', data.data);
                }

                $scope.objects = data.data.spawnList;
            });
        };

        $scope.attack = function(target) {
            $http.get('http://api.daggersandsorcery.com/map/combat/'+target).success(function (data, status, headers, config) {
                if(!data.error) {
                    $state.go('combat', {'combatMessages': data.combatMessages});
                }
            });
        }*/
    }
};