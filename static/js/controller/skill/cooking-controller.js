'use strict';

module.exports = function ($scope, $http, $rootScope, cookingInfo) {
    $scope.cookingInfo = cookingInfo.data.data;
};