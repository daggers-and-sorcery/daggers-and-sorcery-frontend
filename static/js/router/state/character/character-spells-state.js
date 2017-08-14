'use strict';

module.exports = {
    name: 'character.spells',
    url: 'spells',
    template: require('partial/main/character/character-spells.html'),
    resolve: {
        spells: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/character/spells').then(function(response) {
                return response.data.data.spells;
            });
        }
    },
    controller: require('js/controller/character/character-spells-controller.js')
};