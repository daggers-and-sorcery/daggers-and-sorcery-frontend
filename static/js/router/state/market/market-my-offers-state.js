'use strict';

module.exports = {
    name: 'market-my-offers',
    url: '/market/listings/',
    template: require('partial/main/market/market-listings.html'),
    resolve: {
        marketData: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/market/show/listings').then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/market/market-my-offers-controller.js')
};