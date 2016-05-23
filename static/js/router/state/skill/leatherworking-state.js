'use strict';

module.exports = {
    name: 'skill-leatherworking',
    url: '/skill/leatherworking/',
    template: require('partial/main/skill/leatherworking.html'),
    /*resolve: {
        cookingInfo: function ($http) {
            return $http({method: 'GET', url: 'http://api.daggersandsorcery.com/skill/leatherworking/info'});
        }
    },*/
    controller: require('js/controller/skill/leatherworking-controller.js')
};