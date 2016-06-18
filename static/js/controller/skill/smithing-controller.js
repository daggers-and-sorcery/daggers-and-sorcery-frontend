'use strict';

//TODO: Use 2 separate html and controller!
module.exports = function ($scope, $http, Flash, smithingRecipeList) {
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

    $scope.create = function (recipeId) {
        var payload = {
            recipeId: recipeId
        };

        if($scope.state == 'smelting') {
            $http.post('http://api.daggersandsorcery.com/skill/smithing/smelting/start', payload).success(function (data, status, headers, config) {
                Flash.clear();
                Flash.create(getSmeltingResultColor(data.data.result.result), getSmeltingResultText(data.data.result.result));

                $scope.refresh();
            });
        } else if($scope.state == 'working') {
            $http.post('http://api.daggersandsorcery.com/skill/smithing/working/start', payload).success(function (data, status, headers, config) {
                Flash.clear();
                Flash.create(getSmeltingResultColor(data.data.result.result), getSmeltingResultText(data.data.result.result));

                $scope.refresh();
            });
        }
    };

    $scope.refresh = function() {
        if($scope.state == 'smelting') {
            $http.get('http://api.daggersandsorcery.com/skill/smithing/smelting/info').then(function (response) {
                $scope.smithingInfo = response.data.data;
            });
        } else if($scope.state == 'working') {
            $http.get('http://api.daggersandsorcery.com/skill/smithing/working/info').then(function (response) {
                $scope.smithingInfo = response.data.data;
            });
        }
    };

    var getSmeltingResultColor = function(result) {
        if (result === 'SUCCESSFUL') {
            return 'success';
        }

        return 'danger';
    };

    var getSmeltingResultText = function(result) {
        switch(result) {
            case 'SUCCESSFUL':
                return 'You successfully smelt that item.';
            case 'UNSUCCESSFUL':
                return 'You tried to create the item but were unsuccessful to do so.';
            case 'INVALID_EVENT':
                return 'Something went wrong! Please report this to the administrator! (Missing recipe!)';
            case 'MISSING_REQUIREMENTS':
                return 'You miss some of the requirements to do this task.';
            case 'MISSING_INGREDIENTS':
                return 'You miss some of the ingredients to do this task.';
            case 'NOT_ENOUGH_MOVEMENT':
                return 'You don\'t have enough movement points to do this task.';
        }
    }
};