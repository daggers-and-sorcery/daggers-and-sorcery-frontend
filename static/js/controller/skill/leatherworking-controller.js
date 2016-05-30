'use strict';

module.exports = function ($scope, $http, $rootScope, curingRecipeList) {
    $scope.leatherworkingInfo = curingRecipeList;

    //TODO: Add the code for switching to leathercrafting

    $scope.create = function (recipeId) {
        var payload = {
            recipeId: recipeId
        };

        $http.post('http://api.daggersandsorcery.com/skill/leatherworking/curing/start', payload).success(function (data, status, headers, config) {
        }).error(function (data, status, headers, config) {
        });
    }
};