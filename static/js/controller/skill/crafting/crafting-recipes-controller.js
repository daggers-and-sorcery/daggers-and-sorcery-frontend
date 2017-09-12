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
        });
    };

    var getCraftingResultText = function (result) {
        switch (result) {
            case 'SUCCESSFUL':
                return 'You successfully created that item.';
            case 'UNSUCCESSFUL':
                return 'You tried to create the item but were unsuccessful to do so.';
            case 'INVALID_RECIPE':
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