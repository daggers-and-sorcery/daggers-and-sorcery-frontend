'use strict';

//TODO: Use 2 separate html and controller!
module.exports = function ($scope, smithingRecipeList) {
    $scope.smithingInfo = smithingRecipeList;
    $scope.state = 'smelting';

    $scope.showSmelting = function () {
        $scope.state = 'smelting';

        $scope.refresh();
    };

    $scope.showWorking = function () {
        $scope.state = 'working';

        $scope.refresh();
    };

    $scope.refresh = function() {

    };
};