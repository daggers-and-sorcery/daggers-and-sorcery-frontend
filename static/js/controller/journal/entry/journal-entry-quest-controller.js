'use strict';

module.exports = function ($scope, journalEntryInfo, $http, $state) {
    $scope.entry = journalEntryInfo;

    $scope.explore = function() {
         $state.go('quest-explore', {'questId': $scope.entry.id});
    }
};