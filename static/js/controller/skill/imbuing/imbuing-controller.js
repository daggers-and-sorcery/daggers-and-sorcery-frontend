'use strict';

module.exports = function ($scope, $http, $rootScope, imbuingInfo, Notification) {
    $scope.imbuingInfo = imbuingInfo;

    $scope.create = function (recipeId) {
        var payload = {
            recipeId: recipeId
        };

        $http.post('https://api.daggersandsorcery.com/skill/imbuing/craft', payload).then(function (response) {
            if (response.data.data.result.successful) {
                Notification.success({
                    message: response.data.data.result.result,
                    icon: 'imbuing',
                    title: 'Imbuing',
                    templateUrl: require('html/popup/popup-with-image.html')
                });
            } else {
                Notification.error({
                    message: response.data.data.result.result,
                    icon: 'imbuing',
                    title: 'Imbuing',
                    templateUrl: require('html/popup/popup-with-image.html')
                });
            }

            $scope.refresh();
        });

        $scope.refresh = function () {
            $http({
                method: 'GET',
                url: 'https://api.daggersandsorcery.com/skill/imbuing/recipe/info'
            }).then(function (response) {
                $scope.imbuingInfo = response.data.data;
                $scope.$parent.skillLevel = response.data.data.skill.level;
            });
        };
    }
};