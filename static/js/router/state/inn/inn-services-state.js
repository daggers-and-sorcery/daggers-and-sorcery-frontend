'use strict';

module.exports = {
    name: 'inn-services',
    url: '/inn/services/',
    data: {
        visibleWhenNotLoggedIn: true
    },
    template: require('partial/main/inn/inn-services.html'),
    resolve: {
        innInfo: function ($http) {
            return $http({method: 'GET', url: 'https://api.daggersandsorcery.com/inn/info'}).then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/inn/inn-services-controller.js')
};