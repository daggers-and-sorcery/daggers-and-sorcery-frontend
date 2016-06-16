'use strict';

module.exports = function ($scope, $http, $rootScope, cookingInfo) {
    $scope.cookingInfo = cookingInfo.data.data;
    $scope.success = null;

    $scope.create = function (recipeId) {
        var payload = {
            recipeId: recipeId
        };

        $http.post('http://api.daggersandsorcery.com/skill/cooking/create', payload).success(function (data, status, headers, config) {
            $scope.success = data.data.success.success;
        }).error(function (data, status, headers, config) {
            $scope.success = false;
        });
    }
};