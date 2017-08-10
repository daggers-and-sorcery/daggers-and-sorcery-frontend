require('js/app.js').directive('itemDefinitionDisplay', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            item: "=item"
        },
        template: require('html/directive/definition/item-definition-display-directive.html'),
        link: function (scope, element, attrs) {
            scope.itemDefinitionPopover = require('html/popover/definition/item-definition-popover.html');

            scope.hasImage = function () {
                return scope.item.equipment
                    || scope.item.id === 1
                    || scope.item.id === 2
                    || scope.item.id === 3
                    || scope.item.id === 4
                    || scope.item.id === 5
                    || scope.item.id === 7
                    || scope.item.id === 8
                    || scope.item.id === 11
                    || scope.item.id === 12
                        //TODO: From this!
                    || scope.item.id === 25
                    || scope.item.id === 49
                    || scope.item.id === 50
                    || scope.item.id === 58
                    || scope.item.id === 74
                    || scope.item.id === 111;
            };

            scope.getItemImage = function () {
                return require('image/inventory/item/' + scope.item.id + '.png');
            };
        }
    };
});