'use strict';

module.exports = function ($scope, $http, shopData) {
    $scope.shopPage = 'shop';
    $scope.shopData = shopData;

    $scope.setShopPage = function (value) {
        $scope.shopPage = value;
    };

    $scope.buyItem = function (itemId) {
        $http.get('http://api.daggersandsorcery.com/shop/' + $scope.shopData.shopDefinition.id + '/buy/' + itemId).then(function () {
            $scope.refreshShop();
        });
    };

    $scope.sellItem = function (itemId) {
        $http.get('http://api.daggersandsorcery.com/shop/' + $scope.shopData.shopDefinition.id + '/sell/' + itemId).then(function () {
            $scope.refreshShop();
        });
    };

    $scope.refreshShop = function () {
        $http.get('http://api.daggersandsorcery.com/shop/' + $scope.shopData.shopDefinition.id).then(function (response) {
            $scope.shopData = response.data.data;
        })
    };
};