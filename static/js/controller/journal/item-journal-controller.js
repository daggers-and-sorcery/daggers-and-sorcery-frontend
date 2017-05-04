'use strict';

module.exports = function ($scope, $http, $stateParams, journalInfo) {
    $scope.list = journalInfo.data.data.journal_info;
};