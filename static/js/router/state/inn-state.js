'use strict';

module.exports = {
    name: 'inn',
    url: '/inn/',
    data: {
        visibleWhenNotLoggedIn: true
    },
    template: require('partial/main/inn.html'),
    resolve: {
        innInfo: function ($http) {
            return $http({method: 'GET', url: 'http://api.daggersandsorcery.com/inn/info'}).then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/inn-controller.js')
};