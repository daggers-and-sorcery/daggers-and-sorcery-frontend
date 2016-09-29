'use strict';

module.exports = function ($scope, $http, comments) {
    $scope.comments = comments;
    console.log(comments);
};