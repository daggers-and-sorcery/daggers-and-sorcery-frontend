'use strict';

module.exports = {
    name: 'character',
    url: '/character/',
    template: require('partial/main/character.html'),
    resolve: {
        characterData: function ($http, characterDataFormatter) {
            console.log("Character data queried.");
            return $http.get('http://api.daggersandsorcery.com/character/info').then(function(response) {
                return characterDataFormatter.format(response.data);
            });
        }
    },
    controller: require('js/controller/character-controller.js')
};