'use strict';

module.exports = function ($scope, $http, $rootScope) {
    //TODO: get this form the scavenging controller
    $scope.user = {
        scavengingPoints: 0
    };

    $scope.scavengingSlider = 0;
    $scope.maxScavengingPointsToConvert = Math.floor((50 - $scope.user.scavengingPoints) / 5) * 5;

    //TODO: from info
    $scope.scavengingEnabled = false;

    $scope.updateScavengingEnabled = function() {
        $scope.scavengingEnabled = !$scope.scavengingEnabled;

        var payload = {
            scavengingEnabled: $scope.scavengingEnabled
        };

        $http.post('https://api.daggersandsorcery.com/skill/scavenging/settings', payload);
    };

    $scope.getCheckboxImage = function() {
        if($scope.scavengingEnabled) {
            return require('image/form/checkbox_selected.png');
        } else {
            return require('image/form/checkbox_empty.png');
        }
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

        $http.post('https://api.daggersandsorcery.com/skill/scavenging/convert', $.param(requestData), requestConfig).then(function (response) {
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
        $http.get('https://api.daggersandsorcery.com/skill/scavenging/info').then(function (response) {
            $scope.user.scavengingPoints = response.data.data.scavengingInfo.scavengingPoints;
            $scope.scavengingEnabled = response.data.data.scavengingInfo.scavengingEnabled;

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