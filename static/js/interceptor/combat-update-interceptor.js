'use strict';

module.exports = require('js/app.js').factory('combatUpdateInterceptor', function ($rootScope) {
    return {
        response: function (response) {
            if (response.data.charinfo !== undefined && response.data.charinfo !== null) {
                $rootScope.user.mana = response.data.charinfo.actualMana;
                $rootScope.user.max_mana = response.data.charinfo.maximumMana;

                $rootScope.user.life = response.data.charinfo.actualHealth;
                $rootScope.user.max_life = response.data.charinfo.maximumHealth;

                $rootScope.user.movement = response.data.charinfo.actualMovement;
                $rootScope.user.max_movement = response.data.charinfo.maximumMovement;
            }

            return response;
        }
    };
});