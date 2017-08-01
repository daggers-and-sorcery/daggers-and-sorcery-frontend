'use strict';

module.exports = function ($scope, $http, $rootScope, $interval, gatheringInfo, Notification) {
    $scope.gatheringInfo = gatheringInfo;

    $scope.startGathering = function () {
        $http.post('https://api.daggersandsorcery.com/skill/herblore/gathering/start').then(function (response) {
            if (response.data.data.result.result === 'SUCCESSFUL') {
                Notification.success({
                    message: getGatheringResultText(response.data.data.result.result),
                    icon: 'gathering',
                    title: 'Herblore <small>(gathering)</small>',
                    templateUrl: require('html/popup/popup-with-image.html')
                });
            } else {
                Notification.error({
                    message: getGatheringResultText(response.data.data.result.result),
                    icon: 'gathering',
                    title: 'Herblore <small>(gathering)</small>',
                    templateUrl: require('html/popup/popup-with-image.html')
                });
            }

            $scope.refresh();
        });
    };

    $scope.refresh = function () {
        $http({
            method: 'GET',
            url: 'https://api.daggersandsorcery.com/skill/herblore/gathering/info'
        }).then(function (response) {
            $scope.gatheringInfo = response.data.data;
        });
    };

    $scope.timer = $interval(function () {
        angular.forEach($scope.gatheringInfo.gathering_list, function (value, key) {
            $scope.gatheringInfo.gathering_list[key].timeLeft -= 1000;

            if ($scope.gatheringInfo.gathering_list[key].timeLeft < 1000) {
                $scope.refresh();
            }
        });
    }, 1000);

    $scope.$on("$destroy", function () {
        if (angular.isDefined($scope.timer)) {
            $interval.cancel($scope.timer);
        }
    });

    var getGatheringResultText = function (result) {
        switch (result) {
            case 'SUCCESSFUL':
                return 'You started to gather herbs.';
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
};