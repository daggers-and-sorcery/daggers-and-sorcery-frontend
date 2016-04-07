'use strict';

module.exports = {
    name: 'map',
    url: '/map/',
    template: require('partial/main/map.html'),
    controller: function ($scope, $http, $state) {
        $scope.explore = function(explorationId) {
            $state.go('explore', {'explorationId': explorationId});
        }
    }
};