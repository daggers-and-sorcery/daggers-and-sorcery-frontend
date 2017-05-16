'use strict';

module.exports = {
    name: 'journal-entry',
    url: '/journal/entry/:type/',
    template: require('partial/main/journal/entry/journal-entry.html'),
    controller: require('js/controller/journal/entry/journal-entry-controller.js')
};