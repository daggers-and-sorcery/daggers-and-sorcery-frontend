'use strict';

module.exports = require('js/app.js').directive('gameMap', function ($injector) {
    return {
        template: '<div id="game-map"></div>',
        scope: {
            position: '='
        },
        link: function (scope, ele, attrs) {

            var game = new Phaser.Game(590, 400, Phaser.AUTO, 'game-map', {preload: preload, create: create, render: render});

            var env = {
                debug: false
            };

            var tile = {
                width: 85,
                height: 128,
                height_offset: 43,

                icon_width: 26,
                icon_x_offset: 2,
                icon_y_offset: 80
            };

            function preload() {
                game.load.image('map_img_1', require('image/map/1.png'));
                game.load.image('map_img_6', require('image/map/6.png'));
                game.load.image('map_img_7', require('image/map/7.png'));
                game.load.image('map_img_15', require('image/map/15.png'));
                game.load.image('map_img_16', require('image/map/16.png'));
                game.load.image('map_img_17', require('image/map/17.png'));

                game.load.image('map_icon_1', require('image/map/icon/1.png'));
                game.load.image('map_icon_2', require('image/map/icon/2.png'));

                game.load.image('player', require('image/player.png'));
            }

            function create() {
                console.log(scope.position);

                renderMap();
            }

            function render() {
                if (env.debug) {
                    // Input debug info
                    game.debug.inputInfo(32, 32);

                    if (Math.round(game.input.mousePointer.y / (tile.height / 2)) % 2 == 0) {
                        game.debug.text("Pos: " + Math.round(game.input.mousePointer.x / (tile.width)) + "/" + Math.round(game.input.mousePointer.y / (tile.height / 2)), 10, 10);
                    } else {
                        game.debug.text("Pos: " + (Math.round((game.input.mousePointer.x - tile.width / 2) / (tile.width))) + "/" + Math.round(game.input.mousePointer.y / (tile.height / 2)), 10, 10);
                    }
                }
            }

            function renderMap() {
                var height_offset = (tile.height - tile.height_offset) - 60;

                console.log("Creating map with height: " + Math.ceil((game.height + height_offset) / tile.height * 2) + " width: " + Math.ceil(game.width / tile.width));
                for (var y = 0; y < Math.ceil((game.height + height_offset) / tile.height * 2); y++) {
                    var width_offset = 0;

                    if (y % 2 == 0) {
                        width_offset = tile.width / 2;
                    }

                    for (var x = 0; x < Math.ceil(game.width / tile.width) + 1; x++) {
                        var x_pos = x * tile.width - width_offset;
                        var y_pos = y * tile.height - y * (tile.height_offset + (tile.height / 3) / 2) - height_offset - 60;
                        //Drawing the tile
                        game.add.sprite(x_pos, y_pos, 'map_img_' + scope.position.map[y][x].background);

                        //Drawing objects
                        for (var objId = 0; objId < scope.position.map[y][x].objects.length; objId++) {
                            //game.add.sprite(x_pos + objId * (tile.icon_width + 2) + tile.icon_x_offset, y_pos + tile.icon_y_offset, 'map_icon_' + map[y][x].objects[objId]);
                            game.add.sprite(x_pos + tile.width - objId * (tile.icon_width + 2) - tile.icon_x_offset - tile.icon_width, y_pos + tile.icon_y_offset, 'map_icon_' + scope.position.map[y][x].objects[objId]);
                        }

                        //Drawing the tile pos
                        if (env.debug) {
                            game.add.text(x_pos + (tile.width / 2) - 24, y_pos + (tile.height / 2) - 24, "x: " + x + " y: " + y + " img: " + scope.position.map[y][x], {font: "12px Arial", fill: "#ff0044", align: "center"});
                        }

                        if (x == 3 && y == 3) {
                            game.add.sprite(x_pos + (tile.width / 2) - 24, y_pos + (tile.height / 2) - 5, 'player');
                        }
                    }
                }
            }

            scope.$on('$destroy', function () {
                game.destroy();
            });

            scope.$on('position', function (event, position) {
                //sprite.x = position.x * 48;
                //sprite.y = position.y * 48;
                console.log(position);
                scope.position = position;
                renderMap();

                //TODO: add map changing
            });


            /*var game = new Phaser.Game(520, 400, Phaser.AUTO, 'game-map', {
             preload: preload,
             create: create,
             update: update,
             render: render
             });

             function preload() {
             game.load.tilemap('map_'+scope.position.map, require('map/' + scope.position.map + '.json'), null, Phaser.Tilemap.TILED_JSON);
             game.load.image('tiles', require('image/map/tileset/base.png'));
             game.load.image('player', require('image/player.png'));
             }

             var map;
             var layer;

             var cursors;
             var sprite;

             function create() {
             map = game.add.tilemap('map_'+scope.position.map);
             map.addTilesetImage('tileset', 'tiles');

             layer = map.createLayer('Ground');

             layer.resizeWorld();

             sprite = game.add.sprite(48, 48, 'player');
             sprite.anchor.setTo(0, 0);
             sprite.x = scope.position.x * 48;
             sprite.y = scope.position.y * 48;

             game.camera.follow(sprite);

             cursors = game.input.keyboard.createCursorKeys();
             }

             function update() {
             }

             function render() {
             //Debug
             //game.debug.text('Tile X: ' + layer.getTileX(sprite.x), 32, 48, 'rgb(0,0,0)');
             //game.debug.text('Tile Y: ' + layer.getTileY(sprite.y), 32, 64, 'rgb(0,0,0)');
             }

             scope.$on('$destroy', function () {
             game.destroy();
             });

             scope.$on('position', function (event, position) {
             sprite.x = position.x * 48;
             sprite.y = position.y * 48;

             //TODO: add map changing
             });*/
        }
    }
});