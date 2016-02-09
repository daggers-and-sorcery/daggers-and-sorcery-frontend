'use strict';

module.exports = function ($scope, $http, $rootScope) {
    //TODO: get this form the scavenging controller
    $scope.user = {
        scavengingPoints: 0
    };

    $scope.scavengingSlider = 0;
    $scope.maxScavengingPointsToConvert = Math.floor((50 - $scope.user.scavengingPoints) / 5) * 5;

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
            $scope.refreshPoints();
        });
    };

    $scope.calculateNeededMovementPoints = function (scavengingSlider) {
        return Math.ceil(scavengingSlider / 5);
    };

    $scope.slider = {
        value: $scope.user.scavengingPoints,
        options: {
            floor: 0,
            step: 5,
            ceil: 0
        }
    };

    $scope.refreshPoints = function () {
        $http.get('http://api.daggersandsorcery.com/skill/scavenging/info').success(function (data, status, headers, config) {
            $scope.user.scavengingPoints = data.data.scavengingInfo.scavengingPoints;

            var pountsUntilMax = Math.floor((50 - $scope.user.scavengingPoints) / 5) * 5;

            if (pountsUntilMax / 5 > $rootScope.user.movement) {
                $scope.slider.options.ceil = $rootScope.user.movement * 5;
            } else {
                $scope.slider.options.ceil = pountsUntilMax;
            }
        });
    };

    $scope.refreshPoints();
};