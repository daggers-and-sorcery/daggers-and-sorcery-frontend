'use strict';

module.exports = {
    name: 'ladder',
    url: '/ladder/',
    template: require('partial/main/ladder.html'),
    resolve: {
        skillTypes: function ($http) {
            return $http({method: 'GET', url: 'http://api.daggersandsorcery.com/skill/list'}).then(function (response) {
                return response.data.data.skillList;
            });
        }
    },
    controller: require('js/controller/ladder-controller.js')
};