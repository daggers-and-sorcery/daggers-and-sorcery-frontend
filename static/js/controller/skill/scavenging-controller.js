'use strict';

module.exports = function ($scope, $http, $rootScope) {
    //TODO: get this form the scavenging controller
    $scope.user = {
        scavengingPoints: 10
    };
    console.log("SCAV:"+$scope.user.scavengingPoints);
    $scope.scavengingSlider = 0;
    $scope.maxScavengingPointsToConvert = Math.floor((50 - $scope.user.scavengingPoints) / 5) * 5;

    $scope.calculateMaxScavengingPointsToConvert = function () {
        var pountsUntilMax = Math.floor((50 - $scope.user.scavengingPoints) / 5) * 5;

        console.log("Pountsuntil: "+pountsUntilMax);

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
            //TODO: update the scavenging points here!
            //$rootScope.$broadcast('profile-update-needed');
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
            ceil: $scope.calculateMaxScavengingPointsToConvert()
        }
    };
};