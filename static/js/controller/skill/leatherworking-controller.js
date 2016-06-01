'use strict';

module.exports = function ($scope, $http, $rootScope, $interval, Flash, curingRecipeList) {
    $scope.leatherworkingInfo = curingRecipeList;

    //TODO: Add the code for switching to leathercrafting

    $scope.create = function (recipeId) {
        var payload = {
            recipeId: recipeId
        };

        $http.post('http://api.daggersandsorcery.com/skill/leatherworking/curing/start', payload).success(function (data, status, headers, config) {
            Flash.create('success', data.data.result.result);

            $scope.refresh();
        });
    };

    $scope.refresh = function () {
        $http({
            method: 'GET',
            url: 'http://api.daggersandsorcery.com/skill/leatherworking/curing/info'
        }).then(function (response) {
            $scope.leatherworkingInfo = response.data.data;
        });
    };

    $scope.timer = $interval(function () {
        angular.forEach($scope.leatherworkingInfo.curing_list, function (value, key) {
            $scope.leatherworkingInfo.curing_list[key].timeLeft -= 1000;

            if($scope.leatherworkingInfo.curing_list[key].timeLeft < 1000) {
                $scope.refresh();
            }
        });
    }, 1000);

    $scope.$on("$destroy", function () {
        if (angular.isDefined($scope.timer)) {
            $interval.cancel($scope.timer);
        }
    });
};