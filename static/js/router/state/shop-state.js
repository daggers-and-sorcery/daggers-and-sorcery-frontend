'use strict';

module.exports = {
    name: 'shop',
    url: '/shop/:shopId',
    template: require('partial/main/shop.html'),
    resolve: {
        shopData: function ($http, $stateParams) {
            return $http.get('http://api.daggersandsorcery.com/shop/' + $stateParams.shopId).then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/shop-controller.js')
};