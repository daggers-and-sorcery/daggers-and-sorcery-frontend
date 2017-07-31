'use strict';

module.exports = function ($scope, $http, $rootScope, $interval, cleaningInfo, Notification) {
    $scope.cleaningInfo = cleaningInfo;

    $scope.create = function (recipeId) {
        var payload = {
            recipeId: recipeId
        };

        $http.post('https://api.daggersandsorcery.com/skill/herblore/cleaning/craft', payload).then(function (response) {
            if (response.data.data.result.result === 'SUCCESSFUL') {
                Notification.success({
                    message: getHerbloreResultText(response.data.data.result.result),
                    icon: 'cleaning',
                    title: 'Herblore <small>(cleaning)</small>',
                    templateUrl: require('html/popup/popup-with-image.html')
                });
            } else {
                Notification.error({
                    message: getHerbloreResultText(response.data.data.result.result),
                    icon: 'cleaning',
                    title: 'Herblore <small>(cleaning)</small>',
                    templateUrl: require('html/popup/popup-with-image.html')
                });
            }

            $scope.refresh();
        });
    };

    $scope.refresh = function () {
        $http({
            method: 'GET',
            url: 'https://api.daggersandsorcery.com/skill/herblore/cleaning/info'
        }).then(function (response) {
            $scope.cleaningInfo = response.data.data;
        });
    };

    var getHerbloreResultText = function (result) {
        switch (result) {
            case 'SUCCESSFUL':
                return 'You successfully cleaned that herb.';
            case 'UNSUCCESSFUL':
                return 'You tried to clean the herb but were unsuccessful to do so.';
            case 'INVALID_EVENT':
                return 'Something went wrong! Please report this to the administrator! (Missing recipe!)';
            case 'MISSING_REQUIREMENTS':
                return 'You miss some of the requirements to do this task.';
            case 'MISSING_INGREDIENTS':
                return 'You miss some of the ingredients to do this task.';
            case 'NOT_ENOUGH_MOVEMENT':
                return 'You don\'t have enough movement points to do this task.';
        }
    };
};