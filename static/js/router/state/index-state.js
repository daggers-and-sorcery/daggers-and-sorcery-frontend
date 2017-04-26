'use strict';

module.exports = {
    name: 'index',
    url: '/',
    data: {
        visibleWhenNotLoggedIn: true
    },
    template: require('partial/main/index.html'),
    resolve: {
        newslist: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/news/last').then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/index-controller.js')
};