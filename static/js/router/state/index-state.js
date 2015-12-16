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
            return $http({method: 'GET', url: 'http://api.daggersandsorcery.com/news/last'});
        }
    },
    controller: require('js/controller/index-controller.js')
};