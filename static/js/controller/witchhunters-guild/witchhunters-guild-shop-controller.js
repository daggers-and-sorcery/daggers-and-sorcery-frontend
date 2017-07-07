'use strict';

module.exports = function ($scope, $http) {

    $scope.buyItem = function (itemId) {
        $http.get('https://api.daggersandsorcery.com/shop/' + $scope.shopData.definition.id + '/buy/' + itemId).then(function () {
            $scope.refreshBuyShop();
        });
    };

    $scope.refreshBuyShop = function () {
        //TODO: Shopid will come from guild rank
        $http.get('https://api.daggersandsorcery.com/shop/buylist/2').then(function (response) {
            $scope.shopData = response.data.data;
        })
    };

    $scope.refreshBuyShop();
};