'use strict';

module.exports = {
    name: 'journal-entry.journal-entry-quest',
    url: 'quest/:entryId',
    template: require('partial/main/journal/entry/journal-entry-quest.html'),
    controller: require('js/controller/journal/entry/journal-entry-quest-controller.js')
};