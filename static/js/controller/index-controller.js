'use strict';

module.exports = function ($scope, $http, newslist) {
    $scope.newslist = newslist.news;

    $scope.newsImage = function (icon) {
        return require('image/icon/news/' + icon + '.png');
    }
};