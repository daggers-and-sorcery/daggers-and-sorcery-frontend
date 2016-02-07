'use strict';

module.exports = function ($scope, $http) {
    $scope.scavengingSlider = 0;
    $scope.maxScavengingPointsToConvert = Math.floor((50 - $scope.user.scavengingPoints) / 5) * 5;

    $scope.calculateMaxScavengingPointsToConvert = function () {
        var pountsUntilMax = Math.floor((50 - $scope.user.scavengingPoints) / 5) * 5;

        if (pountsUntilMax / 5 > $rootScope.user.movement) {
            pountsUntilMax = $rootScope.user.movement * 5;
        }

        return pountsUntilMax;
    };

    $scope.convertScavengingPoints = function () {
        if ($scope.scavengingSlider == 0) {
            return;
        }

        var requestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        var requestData = {
            pointsToConvert: $scope.scavengingSlider / 5
        };

        $http.post('http://api.daggersandsorcery.com/skill/scavenging/convert', $.param(requestData), requestConfig).success(function (data, status, headers, config) {
            $rootScope.$broadcast('profile-update-needed');
        });
    };

    $scope.calculateNeededMovementPoints = function (scavengingSlider) {
        return Math.ceil(scavengingSlider / 5);
    };
};