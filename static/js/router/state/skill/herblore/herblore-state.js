'use strict';

module.exports = {
    name: 'skill-herblore',
    url: '/skill/herblore/',
    controller: function ($state) {
        $state.go('skill-herblore-gathering');
    }
};