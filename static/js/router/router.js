'use strict';

module.exports = require('js/app.js').config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state(require('./state/index-state.js'))
            .state(require('./state/character-state.js'))
            .state(require('./state/journal/item-journal-state.js'))
            .state(require('./state/journal/monster-journal-state.js'))
            .state(require('./state/journal-entry-state.js'))
            .state(require('./state/map-state.js'))
            .state(require('./state/explore-state.js'))
            .state(require('./state/logout-state.js'))
            .state(require('./state/registration-state.js'))
            .state(require('./state/shop-state.js'))
            .state(require('./state/market/market-list-sell-state.js'))
            .state(require('./state/market/market-list-buy-state.js'))
            .state(require('./state/market/market-entry-sell-state.js'))
            .state(require('./state/market/market-entry-buy-state.js'))
            .state(require('./state/market/market-my-offers-state.js'))
            .state(require('./state/spellpage-state.js'))
            .state(require('./state/prelude-state.js'))
            .state(require('./state/skill/scavenging-state.js'))
            .state(require('./state/skill/cooking-state.js'))
            .state(require('./state/skill/leatherworking-state.js'))
            .state(require('./state/skill/smithing-state.js'))
            .state(require('./state/skill/fletching-state.js'))
            .state(require('./state/skill/herblore/herblore-state.js'))
            .state(require('./state/skill/herblore/herblore-gathering-state.js'))
            .state(require('./state/skill/herblore/herblore-cleaning-state.js'))
            .state(require('./state/skill/herblore/herblore-recipes-state.js'))
            .state(require('./state/inn/inn-state.js'))
            .state(require('./state/inn/inn-chat-state.js'))
            .state(require('./state/inn/inn-services-state.js'))
            .state(require('./state/ladder-state.js'))
            .state(require('./state/home-state.js'))
            .state(require('./state/knowledge-base-state.js'))
            .state(require('./state/witchhunters-guild/witchhunters-guild-state.js'))
            .state(require('./state/witchhunters-guild/witchhunters-guild-quest-state.js'))
            .state(require('./state/witchhunters-guild/witchhunters-guild-main-state.js'))
            .state(require('./state/witchhunters-guild/witchhunters-guild-shop-state.js'))
            .state(require('./state/forum/forum-category-list-state.js'))
            .state(require('./state/forum/forum-comment-list-state.js'))
            .state(require('./state/forum/forum-topic-list-state.js'));
    }
);