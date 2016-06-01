'use strict';

module.exports = function ($scope, $http, $rootScope, $interval, Flash, curingRecipeList) {
    $scope.leatherworkingInfo = curingRecipeList;

    //TODO: Add the code for switching to leathercrafting

    $scope.create = function (recipeId) {
        var payload = {
            recipeId: recipeId
        };

        $http.post('http://api.daggersandsorcery.com/skill/leatherworking/curing/start', payload).success(function (data, status, headers, config) {
            Flash.create(getCuringResultColor(data.data.result.result), getCuringResultText(data.data.result.result));

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

    var getCuringResultColor = function(result) {
        if (result === 'SUCCESSFUL') {
            return 'success';
        }

        return 'danger';
    };

    var getCuringResultText = function(result) {
        switch(result) {
            case 'SUCCESSFUL':
                return 'You started to work on that item.';
            case 'QUEUE_FULL':
                return 'You don\'t have enough place to cure that!';
            case 'INVALID_EVENT':
                return 'Something went wrong! Please report this to the administrator!';
            case 'MISSING_REQUIREMENTS':
                return 'You miss some of the requirements to do this task.';
            case 'MISSING_INGREDIENTS':
                return 'You miss some of the ingredients to do this task.';
            case 'NOT_ENOUGH_MOVEMENT':
                return 'You don\'t have enough movement points to do this task.';
        }
    }
};