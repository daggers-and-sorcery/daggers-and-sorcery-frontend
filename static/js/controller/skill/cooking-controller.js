'use strict';

module.exports = function ($scope, $http, $rootScope, cookingInfo, Notification) {
    $scope.cookingInfo = cookingInfo.data.data;

    $scope.create = function (recipeId) {
        var payload = {
            recipeId: recipeId
        };

        $http.post('https://api.daggersandsorcery.com/skill/cooking/create', payload).then(function (response) {
            if(response.data.data.success.success) {
                Notification.success({message: 'You successfully cooked the food!', title: 'Cooking'});
            } else {
                Notification.error({message: 'Something went wrong while tried to cook!', title: 'Cooking'});
            }
        });
    }
};