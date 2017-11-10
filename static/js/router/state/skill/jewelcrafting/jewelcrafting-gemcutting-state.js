'use strict';

module.exports = {
    name: 'skill-jewelcrafting.gemcutting',
    url: 'skill/jewelcrafting/gemcutting',
    template: require('partial/main/skill/jewelcrafting/jewelcrafting-gemcutting.html'),
    resolve: {
        weavingInfo: function ($http) {
            return $http({method: 'GET', url: 'https://api.daggersandsorcery.com/skill/jewelcrafting/gemcutting/info'}).then(function(response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/skill/jewelcrafting/jewelcrafting-gemcutting-controller.js')
};