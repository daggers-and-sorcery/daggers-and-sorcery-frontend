'use strict';

//TODO: Use 3 separate html and controller!
module.exports = function ($scope, $http, $rootScope, $interval, curingRecipeList, Notification) {
    $scope.leatherworkingInfo = curingRecipeList;
    $scope.state = 'curing';

    $scope.showCuring = function () {
        $scope.state = 'curing';

        $scope.refresh();
    };

    $scope.showTanning = function () {
        $scope.state = 'tanning';

        $scope.refresh();
    };

    $scope.showWorking = function () {
        $scope.state = 'working';

        $scope.refresh();
    };

    $scope.create = function (recipeId) {
        var payload = {
            recipeId: recipeId
        };

        if ($scope.state == 'curing') {
            $http.post('https://api.daggersandsorcery.com/skill/leatherworking/curing/start', payload).then(function (response) {
                if (response.data.data.result.result === 'SUCCESSFUL') {
                    Notification.success({
                        message: getCuringResultText(response.data.data.result.result),
                        icon: 'curing',
                        title: 'Leaterworking <small>(curing)</small>',
                        templateUrl: require('html/popup/popup-with-image.html')
                    });
                } else {
                    Notification.error({
                        message: getCuringResultText(response.data.data.result.result),
                        icon: 'curing',
                        title: 'Leaterworking <small>(curing)</small>',
                        templateUrl: require('html/popup/popup-with-image.html')
                    });
                }

                $scope.refresh();
            });
        } else if ($scope.state == 'tanning') {
            $http.post('https://api.daggersandsorcery.com/skill/leatherworking/tanning/start', payload).then(function (response) {
                if (response.data.data.result.result === 'SUCCESSFUL') {
                    Notification.success({
                        message: getTanningResultText(response.data.data.result.result),
                        icon: 'tanning',
                        title: 'Leaterworking <small>(tanning)</small>',
                        templateUrl: require('html/popup/popup-with-image.html')
                    });
                } else {
                    Notification.error({
                        message: getTanningResultText(response.data.data.result.result),
                        icon: 'tanning',
                        title: 'Leaterworking <small>(tanning)</small>',
                        templateUrl: require('html/popup/popup-with-image.html')
                    });
                }

                $scope.refresh();
            });
        } else if ($scope.state == 'working') {
            $http.post('https://api.daggersandsorcery.com/skill/leatherworking/working/start', payload).then(function (response) {
                if (response.data.data.result.result === 'SUCCESSFUL') {
                    Notification.success({
                        message: getTanningResultText(response.data.data.result.result),
                        icon: 'leatherworking',
                        title: 'Leaterworking',
                        templateUrl: require('html/popup/popup-with-image.html')
                    });
                } else {
                    Notification.error({
                        message: getTanningResultText(response.data.data.result.result),
                        icon: 'leatherworking',
                        title: 'Leaterworking',
                        templateUrl: require('html/popup/popup-with-image.html')
                    });
                }

                $scope.refresh();
            });
        }
    };

    $scope.refresh = function () {
        if ($scope.state == 'curing') {
            $http({
                method: 'GET',
                url: 'https://api.daggersandsorcery.com/skill/leatherworking/curing/info'
            }).then(function (response) {
                $scope.leatherworkingInfo = response.data.data;
            });
        } else if ($scope.state == 'tanning') {
            $http({
                method: 'GET',
                url: 'https://api.daggersandsorcery.com/skill/leatherworking/tanning/info'
            }).then(function (response) {
                $scope.leatherworkingInfo = response.data.data;
            });
        } else if ($scope.state == 'working') {
            $http({
                method: 'GET',
                url: 'https://api.daggersandsorcery.com/skill/leatherworking/working/info'
            }).then(function (response) {
                $scope.leatherworkingInfo = response.data.data;
            });
        }
    };

    $scope.timer = $interval(function () {
        angular.forEach($scope.leatherworkingInfo.curing_list, function (value, key) {
            $scope.leatherworkingInfo.curing_list[key].timeLeft -= 1000;

            if ($scope.leatherworkingInfo.curing_list[key].timeLeft < 1000) {
                $scope.refresh();
            }
        });
    }, 1000);

    $scope.$on("$destroy", function () {
        if (angular.isDefined($scope.timer)) {
            $interval.cancel($scope.timer);
        }
    });

    var getCuringResultText = function (result) {
        switch (result) {
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
    };

    var getTanningResultText = function (result) {
        switch (result) {
            case 'SUCCESSFUL':
                return 'You successfully tanned that item.';
            case 'INVALID_EVENT':
                return 'Something went wrong! Please report this to the administrator! (Missing recipe!)';
            case 'MISSING_REQUIREMENTS':
                return 'You miss some of the requirements to do this task.';
            case 'MISSING_INGREDIENTS':
                return 'You miss some of the ingredients to do this task.';
            case 'NOT_ENOUGH_MOVEMENT':
                return 'You don\'t have enough movement points to do this task.';
        }
    }
};