'use strict';

module.exports = {
    name: 'map',
    url: '/map/',
    template: require('partial/main/map.html'),
    controller: function ($scope, $http, $state) {
        $scope.explore = function(explorationId) {
            $http.get('http://api.daggersandsorcery.com/explore/').success(function (data, status, headers, config) {
                console.log(data);
            });
        }
    }
};