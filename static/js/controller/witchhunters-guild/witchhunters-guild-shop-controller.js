'use strict';

module.exports = function ($scope, $http, shopInfo) {
    $scope.shopInfo = shopInfo;

    $scope.isShopAvailable = function() {
        return $scope.shopInfo.shop.shopId !== -1;
    }

    $scope.buyItem = function (itemId) {
        $http.get('https://api.daggersandsorcery.com/shop/' + $scope.shopInfo.shop.shopId + '/buy/' + itemId).then(function () {
            $scope.refreshBuyShop();
        });
    };

    $scope.refreshBuyShop = function () {
        $http.get('https://api.daggersandsorcery.com/shop/buylist/'+$scope.shopInfo.shop.shopId).then(function (response) {
            $scope.shopData = response.data.data;
        })
    };

    $scope.refreshBuyShop();
};