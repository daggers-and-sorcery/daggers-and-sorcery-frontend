'use strict';

module.exports = function ($scope, $state, innInfo) {
    console.log(innInfo);

    $scope.inn = innInfo;

    $scope.getServiceImage = function (service) {
        return require('image/inn/' + service.toLowerCase().replace("_", "-") + '.jpg');
    };

    $scope.showChat = function () {
        $state.go('inn');
    }
};