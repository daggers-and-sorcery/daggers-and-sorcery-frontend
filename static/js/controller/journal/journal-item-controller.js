'use strict';

module.exports = function ($scope, journalInfo) {
    $scope.list = journalInfo.data.data.journal_info;
};