require('js/app.js').directive('bigButton', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            target: "@target",
            title: "@title",
            image: "@image"
        },
        template: require('html/directive/big-button.html'),
        link: function (scope, element, attrs) {
            scope.shouldGlow = false;

            scope.enableGlow = function (shouldGlow) {
                scope.shouldGlow = shouldGlow;
            };

            scope.getImage = function (image) {
                return require('image/icon/extra/' + image + '.png');
            };
        }
    };
});