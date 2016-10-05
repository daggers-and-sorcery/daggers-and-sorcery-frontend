'use strict';

module.exports = function ($scope, categories) {
    $scope.categories = categories;

    $scope.getForumIcon = function (forumIconName) {
        return require('image/icon/forum/' + forumIconName + '.png');
    };
};