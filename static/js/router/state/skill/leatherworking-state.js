'use strict';

module.exports = {
    name: 'skill-leatherworking',
    url: '/skill/leatherworking/',
    template: require('partial/main/skill/leatherworking.html'),
    resolve: {
        curingRecipeList: function ($http) {
            return $http({method: 'GET', url: 'https://api.daggersandsorcery.com/skill/leatherworking/curing/info'}).then(function(response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/skill/leatherworking-controller.js')
};