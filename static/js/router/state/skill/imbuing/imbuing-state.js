'use strict';

module.exports = {
    name: 'skill-imbuing',
    url: '/skill/imbuing/',
    template: require('partial/main/skill/imbuing/imbuing.html'),
    resolve: {
        imbuingInfo: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/skill/imbuing/recipe/info').then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/skill/imbuing/imbuing-controller.js')
};