'use strict';

module.exports = function ($scope, $state, $http, $sce, marked, Flash, innInfo) {
    $scope.inn = innInfo;

    $scope.getServiceImage = function (service) {
        return require('image/inn/' + service.toLowerCase().replace(/_/g, "-") + '.jpg');
    };

    $scope.showChat = function () {
        $state.go('inn');
    };

    $scope.inn.showShortDescription = true;
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            $scope.inn.short_description = "<p>You approach the Drunken Dragoon Inn, a humble establishment lying beside the Hister River. The structure stands an impressive four stories high, but if one considers the bell tower, there are twelve stories in all. The architecture consists of basic elements such as stone, wood, and iron, and the later expansions to the inn were constructed with brick and clay. The inn heavily resembles a patchwork quilt which lends credence to its name.</p>";
            $scope.inn.description = "<p>You approach the Drunken Dragoon Inn, a humble establishment lying beside the Hister River. The structure stands an impressive four stories high, but if one considers the bell tower, there are twelve stories in all. The architecture consists of basic elements such as stone, wood, and iron, and the later expansions to the inn were constructed with brick and clay. The inn heavily resembles a patchwork quilt which lends credence to its name.</p><p>You marvel at the golden light spilling from the window sills. You shoulder your pack and yearn to relax.</p><p>As soon as you enter, jovial music and conversation overwhelms you. Farmers clap each other on the back and slam their tankards of ale together. Barmaids bustle around in their frilly skirts, delivering platters of steaming meats. A cookfire roars in the fireplace with a giant cauldron of stew simmering above it. Tykes are dancing before the performers and humming to their tune. The delectable scents ease your spirits and guide you to a wooden platform.</p><p>A portrait of a sailor hangs on the wall and bears the inscription - The Drunken Dragoon. The innkeeper turns around and shares an uncanny resemblance with the man. It seems the sailor is an ancestor. You wonder how many generations back.</p><p>\"Greetings, Wanderer! My name is Doran. How may I serve you?\"</p>";
            break;
        case 1:
            $scope.inn.short_description = "<p>It is twilight when you approach the Drunken Dragoon Inn. Vibrant, pennant flags are strung across the entrance, and you recall talk of a knife-throwing competition. You wish to try your luck and earn the grand prize which is lodging for a night.</p>";
            $scope.inn.description = "<p>It is twilight when you approach the Drunken Dragoon Inn. Vibrant, pennant flags are strung across the entrance, and you recall talk of a knife-throwing competition. You wish to try your luck and earn the grand prize which is lodging for a night.</p><p>You enter the inn and notice the tables have been pushed aside. Three red targets stand at the far end of the room, and a straw scarecrow is propped in the center. Two daggers protrude from the scarecrow's belly. You move to the side and cross your arms, studying your opponents. The farmer currently throwing seems to have never wielded a knife before. All of his throws miss by a mile and collide with the stone wall. As soon as he finishes, you step up to take your turn. You grab the first knife and aim for one of the targets.</p><p>\"Take a deep breath, kid,\" a tall man warns.</p><p>You ignore the man. He is just trying to distract you.</p><p>Your first knife hits the edge of a target. You almost hit the bulls-eye of the second target, but you miss the third target entirely. You hit the scarecrow but not hard enough for the knife to stick.</p><p>The man patronizing you from before brushes past you to take his turn. He grabs four knives and throws. The knives split the air and pierce the bulls-eyes and the scarecrow's heart. All of the patrons erupt into excited cheers, swarming the man to congratulate him. </p><p>After a few moments, the man exits the crowd and reaches your side. \"My name is Blunk. Let me buy you a drink,\" he insists. He leads you to the bar. You sip from your drink and listen to Blunk's tale. He wears a tattered cloak, reminding you of a thief, yet Blunk seems too charitable for that. When Blunk finishes his tale, he excuses himself and leaves you at the bar.</p>";
            break;
        case 2:
            $scope.inn.short_description = "<p>It is nightfall when you enter the Drunken Dragoon Inn. The patrons have calmed down, and many of the farmers have turned in for the night. A duet plays gentle music at the stage, lulling the crowd into a repose. You suppress a yawn while searching for a vacant table.</p>";
            $scope.inn.description = "<p>It is nightfall when you enter the Drunken Dragoon Inn. The patrons have calmed down, and many of the farmers have turned in for the night. A duet plays gentle music at the stage, lulling the crowd into a repose. You suppress a yawn while searching for a vacant table.</p><p>Your gaze drifts to the side, and you witness a peculiar yet familiar sight. Could it be? An elderly man with a long, white beard sits in the corner. His wrinkled hands are clasped tight together, and he appears to be listening to the musicians. You vaguely remember this man, and it takes you a few moments to recall where from. This was the beggar on the side of the road! You wanted to ask him how he conjured those fireballs.</p><p>You cross to the old man's table, but he lifts his hand, halting you. \"Not now, adventurer. The time is not right, but we will meet again.\"</p><p>Without warning, a blue light flashes around the man and blurs your vision. You squeeze your eyes shut and feel the ground beneath you shudder. When you glance back, the old man is gone, and nobody seems to have noticed the lights but you. A shiver races down your spine as you back away from the empty table. This was no mere beggar!</p><p>\"I need a drink,\" you insist to the barkeeper. You ease down on a stool and grab your ale with shaky hands. Would they meet again?</p>";
            break;
    }

    $scope.switchDescription = function () {
        $scope.inn.showShortDescription = !$scope.inn.showShortDescription;
    };

    $scope.orderService = function (serviceId) {
        $http.get('http://api.daggersandsorcery.com/inn/service/' + serviceId).then(function (response) {
            if (response.data.data.result.successful) {
                Flash.create('success', 'You successfully paid for the service and enjoy it\'s benefits.');
            } else {
                Flash.create('danger', 'Something went wrong! Maybe you don\'t have enough coins or too tired?');
            }
        });
    };

    $scope.getDetails = function (serviceId) {
        if (serviceId === 'SMALL_SERVING_FOOD') {
            return $sce.trustAsHtml(
                '<dl>' +
                '<dt>Cost</dt><dd>3 Bronze coins and 1 movement point.</dd>' +
                '<dt>Effect</dt><dd>You are healed for 5 health points.</dd>' +
                '</dl>'
            );
        } else if (serviceId === 'COMMON_ROOM') {
            return $sce.trustAsHtml(
                '<dl>' +
                '<dt>Cost</dt><dd>7 Bronze coins and 2 movement point.</dd>' +
                '<dt>Effect</dt><dd>You are healed for 12 health points.</dd>' +
                '</dl>'
            );
        }
    }
};