'use strict';

module.exports = {
    name: 'market',
    url: '/market/',
    template: require('partial/main/market/market.html'),
    resolve: {
        marketData: function ($http) {
            return $http.get('http://api.daggersandsorcery.com/shop/buylist/1').then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/market/market-controller.js')
};