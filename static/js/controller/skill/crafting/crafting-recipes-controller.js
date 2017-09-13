'use strict';

module.exports = function ($scope, $http, $rootScope, $interval, recipesInfo, Notification) {
    $scope.recipesInfo = recipesInfo;
    $scope.$parent.skillLevel = $scope.recipesInfo.skill.level;

    $scope.create = function (recipeId) {
        var payload = {
            recipeId: recipeId
        };

        $http.post('https://api.daggersandsorcery.com/skill/crafting/recipe/craft', payload).then(function (response) {
            if (response.data.data.result.successful) {
                Notification.success({
                    message: response.data.data.result.result,
                    icon: 'crafting',
                    title: 'Crafting',
                    templateUrl: require('html/popup/popup-with-image.html')
                });
            } else {
                Notification.error({
                    message: response.data.data.result.result,
                    icon: 'crafting',
                    title: 'Crafting',
                    templateUrl: require('html/popup/popup-with-image.html')
                });
            }

            $scope.refresh();
        });
    };

    $scope.refresh = function () {
        $http({
            method: 'GET',
            url: 'https://api.daggersandsorcery.com/skill/crafting/recipe/info'
        }).then(function (response) {
            $scope.recipesInfo = response.data.data;
            $scope.$parent.skillLevel = response.data.data.skill.level;
        });
    };
};