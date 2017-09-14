require('js/app.js').directive('itemDefinitionDisplay', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            item: "=item",
            display: "@"
        },
        template: require('html/directive/definition/item-definition-display-directive.html'),
        link: function (scope, element, attrs) {
            if(scope.display === undefined) {
                scope.display = 'text';
            }

            scope.itemDefinitionPopover = require('html/popover/definition/item-definition-popover.html');

            scope.hasImage = function () {
                try {
                    return __webpack_modules__[require.resolveWeak('image/inventory/item/' + scope.item.id + '.png')];
                } catch (err) {
                    return false;
                }
            };

            scope.getItemImage = function () {
                return require('image/inventory/item/' + scope.item.id + '.png');
            };
        }
    };
});