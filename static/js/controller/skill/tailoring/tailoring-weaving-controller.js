'use strict';

module.exports = function ($scope, $http, $rootScope, $interval, weavingInfo, Notification) {
    $scope.weavingInfo = weavingInfo;
    $scope.$parent.skillLevel = $scope.weavingInfo.skill.level;

    $scope.create = function (recipeId) {
        var payload = {
            recipeId: recipeId
        };

        $http.post('https://api.daggersandsorcery.com/skill/tailoring/weaving/craft', payload).then(function (response) {
            if (response.data.data.result.weavingResult === 'SUCCESSFUL') {
                Notification.success({
                    message: getWeavingResultText(response.data.data.result.weavingResult),
                    icon: 'weaving',
                    title: 'Tailoring <small>(weaving)</small>',
                    templateUrl: require('html/popup/popup-with-image.html')
                });
            } else {
                Notification.error({
                    message: getWeavingResultText(response.data.data.result.weavingResult),
                    icon: 'weaving',
                    title: 'Tailoring <small>(weaving)</small>',
                    templateUrl: require('html/popup/popup-with-image.html')
                });
            }

            $scope.refresh();
        });
    };

    $scope.refresh = function () {
        $http({
            method: 'GET',
            url: 'https://api.daggersandsorcery.com/skill/tailoring/weaving/info'
        }).then(function (response) {
            $scope.weavingInfo = response.data.data;
        });
    };

    var getWeavingResultText = function (result) {
        switch (result) {
            case 'SUCCESSFUL':
                return 'You successfully cut that gem.';
            case 'UNSUCCESSFUL':
                return 'You tried to cut the gem but were unsuccessful to do so.';
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