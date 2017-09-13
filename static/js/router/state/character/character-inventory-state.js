'use strict';

module.exports = {
    name: 'character.inventory',
    url: 'inventory',
    template: require('partial/main/character/character-inventory.html'),
    resolve: {
        equipmentInfo: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/character/equipment').then(function(response) {
                return response.data.data.equipment;
            });
        }
    },
    controller: require('js/controller/character/character-inventory-controller.js')
};