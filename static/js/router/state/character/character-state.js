'use strict';

module.exports = {
    name: 'character',
    url: '/character/',
    template: require('partial/main/character/character.html'),
    resolve: {
        characterData: function ($http, characterDataFormatter) {
            return $http.get('https://api.daggersandsorcery.com/character/info').then(function(response) {
                return characterDataFormatter.format(response.data);
            });
        }
    },
    controller: require('js/controller/character/character-controller.js')
};