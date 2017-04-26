'use strict';

module.exports = {
    name: 'market-list-buy',
    url: '/market/buy',
    template: require('partial/main/market/market-list-buy.html'),
    resolve: {
        marketData: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/market/show/buy/list').then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/market/market-list-buy-controller.js')
};