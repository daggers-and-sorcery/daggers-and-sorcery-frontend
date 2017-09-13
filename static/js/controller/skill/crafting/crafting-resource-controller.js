'use strict';

module.exports = function ($scope, $http, $rootScope, $interval, resourceInfo, Notification) {
    $scope.resourceInfo = resourceInfo;
    $scope.$parent.skillLevel = $scope.resourceInfo.skill.level;

    $scope.create = function (recipeId) {
        var payload = {
            recipeId: recipeId
        };

        $http.post('https://api.daggersandsorcery.com/skill/crafting/resource/craft', payload).then(function (response) {
            if (response.data.data.result.successful) {
                Notification.success({
                    message: response.data.data.result.result,
                    icon: 'crafting',
                    title: 'Crafting <small>(resource)</small>',
                    templateUrl: require('html/popup/popup-with-image.html')
                });
            } else {
                Notification.error({
                    message: response.data.data.result.result,
                    icon: 'crafting',
                    title: 'Crafting <small>(resource)</small>',
                    templateUrl: require('html/popup/popup-with-image.html')
                });
            }

            $scope.refresh();
        });
    };

    $scope.refresh = function () {
        $http({
            method: 'GET',
            url: 'https://api.daggersandsorcery.com/skill/crafting/resource/info'
        }).then(function (response) {
            $scope.resourceInfo = response.data.data;
            $scope.$parent.skillLevel = response.data.data.skill.level;
        });
    };
};