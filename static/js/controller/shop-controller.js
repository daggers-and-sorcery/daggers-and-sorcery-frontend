'use strict';

module.exports = function ($scope, $http, shopData) {
    $scope.shopPage = 'shop';
    $scope.shopData = shopData;

    $scope.floor = function(value) {
        return Math.floor(value);
    };

    $scope.setShopPage = function (value) {
        $scope.shopPage = value;

        if (value === 'player') {
            $scope.refreshSellShop();
        } else {
            $scope.refreshBuyShop();
        }
    };

    $scope.buyItem = function (itemId) {
        $http.get('https://api.daggersandsorcery.com/shop/' + $scope.shopData.definition.id + '/buy/' + itemId).then(function () {
            $scope.refreshBuyShop();
        });
    };

    $scope.sellItem = function (itemId) {
        $http.get('https://api.daggersandsorcery.com/shop/' + $scope.shopData.definition.id + '/sell/' + itemId).then(function () {
            $scope.refreshSellShop();
        });
    };

    $scope.refreshSellShop = function () {
        $http.get('https://api.daggersandsorcery.com/shop/selllist/' + $scope.shopData.definition.id).then(function (response) {
            $scope.shopData = response.data.data;
        })
    };

    $scope.refreshBuyShop = function () {
        $http.get('https://api.daggersandsorcery.com/shop/buylist/' + $scope.shopData.definition.id).then(function (response) {
            $scope.shopData = response.data.data;
        })
    };

    $scope.getItemTypeImage = function (itemType) {
        return require('image/icon/inventory/' + itemType.toLowerCase() + '.png');
    };
};