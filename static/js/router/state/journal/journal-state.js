'use strict';

module.exports = {
    name: 'journal',
    url: '/journal/list/',
    template: require('partial/main/journal/journal.html'),
    controller: require('js/controller/journal/journal-controller.js')
};