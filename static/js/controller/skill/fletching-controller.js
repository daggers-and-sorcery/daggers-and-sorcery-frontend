'use strict';

module.exports = function ($scope, $http, Flash, fletchingInfo) {
    $scope.fletchingInfo = fletchingInfo;

    $scope.create = function (recipeId) {
        var payload = {
            recipeId: recipeId
        };

        $http.post('http://api.daggersandsorcery.com/skill/fletching/create', payload).success(function (data, status, headers, config) {
            Flash.clear();
            Flash.create(getFletchingResultColor(data.data.result.result), getFletchingResultText(data.data.result.result));

            $scope.refresh();
        });
    };

    $scope.refresh = function () {
        $http.get('http://api.daggersandsorcery.com/skill/fletching/info').then(function (response) {
            $scope.fletchingInfo = response.data.data;
        });
    };

    var getFletchingResultColor = function (result) {
        if (result === 'SUCCESSFUL') {
            return 'success';
        }

        return 'danger';
    };

    var getFletchingResultText = function (result) {
        switch (result) {
            case 'SUCCESSFUL':
                return 'You successfully fletch that item.';
            case 'UNSUCCESSFUL':
                return 'You tried to fletch the item but were unsuccessful to do so.';
            case 'INVALID_EVENT':
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