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
        },
        ladderInfo: function($http) {
            return $http.get('http://api.daggersandsorcery.com/ladder/skill/TWO_HANDED_CRUSHING_WEAPONS/1').then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/ladder-controller.js')
};