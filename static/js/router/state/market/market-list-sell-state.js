'use strict';

module.exports = {
    name: 'market-list-sell',
    url: '/market/sell/',
    template: require('partial/main/market/market-list-sell.html'),
    resolve: {
        marketData: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/market/show/sell/list').then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/market/market-list-sell-controller.js')
};