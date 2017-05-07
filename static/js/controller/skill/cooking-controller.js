'use strict';

module.exports = function ($scope, $http, $rootScope, cookingInfo) {
    $scope.cookingInfo = cookingInfo.data.data;
    $scope.success = null;

    $scope.create = function (recipeId) {
        var payload = {
            recipeId: recipeId
        };

        $http.post('https://api.daggersandsorcery.com/skill/cooking/create', payload).then(function (response) {
            $scope.success = response.data.data.success.success;
        });
    }
};