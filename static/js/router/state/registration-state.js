'use strict';

module.exports = {
    name: 'registration',
    url: '/registration/',
    data: {
        visibleWhenNotLoggedIn: true
    },
    template: require('partial/main/registration.html'),
    controller: function ($scope, $http, $log, $rootScope, $state) {
        $scope.user = {};
        $scope.visibleRace = 0;
        $scope.errorList = [];

        $scope.attributeDescriptionPopover = require('html/popover/registration-attribute-description-popover.html');
        $scope.attributeDescribtionMap = {};
        require('data/attribute/definition.xml').attributes.attribute.forEach(function (item, index) {
            $scope.attributeDescribtionMap[item.id[0]] = item.description[0];
        });

        $scope.combatAttributeDescriptionMap = function (attribute) {
            if ($scope.attributeDescribtionMap[attribute.toLowerCase()] != undefined) {
                return $scope.attributeDescribtionMap[attribute.toLowerCase()];
            }

            return "No description ***(yet)***.";
        };

        $scope.race = [
            {
                id: 'HUMAN',
                name: 'Human',
                attributeBonus: [],
                description: 'It comes to no surprise that humans are the most dominant race in the realm. For centuries, they have endured through the harshest of times and tamed the wildest of lands. Their ancestors are most notable for being pioneers of change and setting off on grand ventures to establish thriving settlements. Through their blood, sweat, and tears, humans refined these rudimentary communities and transformed them into sprawling empires governed by royal families. This nobility often arranges marriages with other nobles to preserve their rich bloodlines and power, and their ire knows no bounds if anything threatens their sovereignty. \n\n However, not all of humanity evolved sophisticated lifestyles. Scattered throughout the wilderness, there are wandering tribes who still believe in tradition and the ancient gods. They are not inept, but they are not as advanced as the rest of their kin. What they lack in sophistication, they make up in a vast knowledge of the past, often collecting and recording venerable relics and detailed testimonies of their ancestors. Some of these tribes are welcoming and yearn to gather the tales of travelers, but the same cannot be said about the more barbaric clans. \n\n All in all, humans display an aptitude for a wide variety of skills which they are not particularly good or bad at. They are average, and there\'s nothing wrong with that. This provides them with endless opportunities. Through their versatility, humans have developed pleasant relations with most of the races which allows them to be very successful merchants. The only exception to this is the orcs whom humans loathe. The orcs are constantly disrupting the economy with their violent wars which hinders the humans\' ability of accumulating wealth and material possessions.'
            },
            {
                id: 'ORC',
                name: 'Orc',
                attributeBonus: [
                    {
                        id: 'STRENGTH',
                        attribute: 'Strength',
                        value: '20'
                    },
                    {
                        id: 'ENDURANCE',
                        attribute: 'Endurance',
                        value: '10'
                    },
                    {
                        id: 'VITALITY',
                        attribute: 'Vitality',
                        value: '10'
                    },
                    {
                        id: 'INTELLIGENCE',
                        attribute: 'Intelligence',
                        value: '-30'
                    },
                    {
                        id: 'WISDOM',
                        attribute: 'Wisdom',
                        value: '-10'
                    },
                    {
                        id: 'WILLPOWER',
                        attribute: 'Willpower',
                        value: '-10'
                    }
                ],
                description: 'Perhaps the most despised among the races, orcs are not a welcomed sight. Most societies have learned to be wary of these fell creatures and the death and destruction surrounding them. Due to their bloody history, orcs have developed a poor reputation, and most people regard them as violent brutes. Common folk justify this reasoning through the orcs\' wild appearance and primitive instincts. \n\nOrcs stand several inches taller than humans, but a rare few, mostly orc alphas, are much taller than that. Furthermore, orcs are musclebound and exceptionally strong, especially their females who have a very high tolerance to pain. They are commonly identified by their green skin along with their tusk-like teeth which protrude from their lips. One of their more striking features is their red eyes which can range from amber to crimson. A majority of cultures associate the color red with fire, blood, and war, but at the same time, red also signifies strength, determination, and passion. \n\nThe orcs\' reputation partially stems from their harsh social structure. The orc alpha rules his clan with an iron fist and typically has several male heirs; heirs are extremely important in orc culture. Even if orcs have a natural lifespan of 60 years, most die before then due to their constant warring. Beneath these heirs, the rest of the orcs are expected to be submissive to the alpha and his kin. However, this submission must be earned. Leadership is based on power alone. Should another orc defeat the alpha, then the power shifts to the champion. This domineering lifestyle is typical of almost all orc clans, and when two alphas knock heads, this is when wars begin. Most of the time, these wars disrupt the peace and often force outside parties to enter the conflict. If a war escalates into a blood feud, orcs become blind to the destruction left in their wake. \n\nAs most assume, orcs are not very intelligent, and oftentimes, they forget why they\'re fighting if a war persists long enough. However, this does not mean that they\'re incapable of learning. Oddly enough, orcs can develop a valuable skill set through their sheer determination alone.'
            },
            {
                id: 'DWARF',
                name: 'Dwarf',
                attributeBonus: [
                    {
                        id: 'PERCEPTION',
                        attribute: 'Perception',
                        value: '20'
                    },
                    {
                        id: 'STRENGTH',
                        attribute: 'Strength',
                        value: '10'
                    },
                    {
                        id: 'VITALITY',
                        attribute: 'Vitality',
                        value: '10'
                    },
                    {
                        id: 'SWIFTNESS',
                        attribute: 'Swiftness',
                        value: '-20'
                    },
                    {
                        id: 'DEXTERITY',
                        attribute: 'Dexterity',
                        value: '-10'
                    },
                    {
                        id: 'CHARISMA',
                        attribute: 'Charisma',
                        value: '-10'
                    },
                    {
                        id: 'BEAUTY',
                        attribute: 'Beauty',
                        value: '-10'
                    }
                ],
                 description: 'Dwarves are renowned for their grand architectural feats and have cemented themselves as one of the most technologically advanced races. Their craftsmanship has erected beautiful citadels and fortresses in some of the most treacherous environments, mostly underground, but nonetheless, it is quite common to see dwarven ruins carved into the mountainsides. Countless skilled architects have attempted to replicate their methods but have ultimately failed. This is due to a rare and ancient gift passed through dwarven bloodlines called stone or metal singing. It is a very magical and guarded technique in which few outsiders are aware of. In addition, this mystical ability allows dwarves to mine, smelt, and smith very, high-quality armor and weaponry in which only the elves can rival in merit. \n\nAs one might suspect, dwarves are very hardy and stubborn creatures. They are likely to exhaust all of their options before creating a new solution to a problem. Their steadfast nature often gets them into trouble, and they sometimes ignore the signs of a catastrophe if they find it preventable. In the past, this has forced dwarven clans to abandon their elaborate cities when ore veins have dried up or their seclusion left them vulnerable to attack. Orcs are notorious for reaping the rewards of dwarves, purging their clans and claiming their strongholds as their own. This has bred a hatred as old as time.\n\nDespite their diminutive heights, dwarves are not meant to be taken lightly. They have boisterous voices, stout bodies, and rough hands from years of hard work. Their vitality is quite exceptional, yet they are often patronized for being slow and clumsy. Regardless, dwarves make up for those faults with unparalleled fortitude, loyalty, and honor. As a result, dwarves are an essential comrade. They are sometimes called a warrior\'s voice of reason, open to diplomacy but never cowering from a fight.'
            },
            {
                id: 'ELF',
                name: 'Elf',
                attributeBonus: [
                    {
                        id: 'INTELLIGENCE',
                        attribute: 'Intelligence',
                        value: '20'
                    },
                    {
                        id: 'WILLPOWER',
                        attribute: 'Willpower',
                        value: '10'
                    },
                    {
                        id: 'BEAUTY',
                        attribute: 'Beauty',
                        value: '10'
                    },
                    {
                        id: 'STRENGTH',
                        attribute: 'Strength',
                        value: '-20'
                    },
                    {
                        id: 'ENDURANCE',
                        attribute: 'Endurance',
                        value: '-20'
                    },
                    {
                        id: 'VITALITY',
                        attribute: 'Vitality',
                        value: '-10'
                    }
                ],
                 description: 'The elves are the caretakers of the land, and their culture is heavily influenced by nature. Throughout the year, they hold countless festivals to celebrate the seasons and promote the vitality of their harvest and communities. Their feasts, though lacking meat, include delicious fruits and greens that purify the body and provide "ever-lasting" energy. For these reasons, elves tend to live within the confines of nature, separating themselves from urban cities. They predominately believe that industrious nations destroy the land in their efforts to expand, and as a result, conflicts occasionally arise when societies accidentally destroy sacred, elven lands. \n\nUnlike the other races, elves lead exceptionally long lives and live up to 1000 years old. Therefore, many believe that elves are immortal as time seemingly does not ravage them. Elves age slowly and retain their beauty and grace even in old age. An average elf stands taller than a human and is quite slender which grants him or her stealth. In addition, their impeccable eye sight and perception encourages them to become accomplished archers and scouts. \n\nElves are in-tune with the balance of nature, and as such, many seek them for counsel in dire situations. Their extensive lifespan allows them to gather immense knowledge, and if asked politely, elves will impart their wisdom to those in need. Furthermore, their insight has bestowed their race with magical abilities unlike any other. Their mages are some of the most respected and powerful beings in the realm. In their own right, magic is not easy to master, yet alchemy, enchanting, and rune making come naturally to them. '
            },
            {
                id: 'DARK_ELF',
                name: 'Dark Elf',
                attributeBonus: [
                    {
                        id: 'DEXTERITY',
                        attribute: 'Dexterity',
                        value: '20'
                    },
                    {
                        id: 'SWIFTNESS',
                        attribute: 'Swiftness',
                        value: '10'
                    },
                    {
                        id: 'PERCEPTION',
                        attribute: 'Perception',
                        value: '10'
                    },
                    {
                        id: 'STRENGTH',
                        attribute: 'Strength',
                        value: '-20'
                    },
                    {
                        id: 'WISDOM',
                        attribute: 'Wisdom',
                        value: '-20'
                    },
                    {
                        id: 'CHARISMA',
                        attribute: 'Charisma',
                        value: '-10'
                    }
                ],
                 description: 'The more ominous of the elven race, dark elves reside deep underground with the utmost secrecy surrounding their culture. Any information or tales of their kind are recounted by the outcasts who deserted their society for adventure. Many scholars are skeptical about the validity of their accounts, but they all seem similar enough to be plausible. \n\nDark elves resemble their elven cousins in terms of physique and their light-colored hair. However, these elves are the likeness of shadow and bear obsidian skin and bright, crimson eyes. As such, the presence of a dark elf is treated with great caution because it is a rare sight to see one above ground. Fortunately, these elves prefer keeping to themselves and care little for matters on the surface. Dwarves are the only creatures who come into regular contact with them which can lead to brutal tunnel warfare. \n\nPrimarily, this elven race lives deep underground in grand cities governed by ancient families. These families reign for many centuries, and it is speculated that the dark elves secretly surpass the elves in worldly and otherworldly knowledge. Their culture is heavily reliant on religion, and thus, their cities are typically built around a temple. \n\nThe ancient deity, Thr\'org, created the dark elves from elves through an unknown magical ritual. In dark elven religion, it is heavily implied that Thr\'org crafted their species in his image, and this tenet is highly revered. This conviction has bestowed dark elves with considerable confidence and poise if not an elevated ego. From a young age, dark elf children are taught of their superiority to all of the races, especially the elves. The rivalry between the two elven races sparked further when the dark elves displayed an aptitude for magic, and they are major proponents of potion making, mystical items, and sorcery. '
            },
            {
                id: 'LIZARDMEN',
                name: 'Lizardmen',
                attributeBonus: [
                    {
                        id: 'DEXTERITY',
                        attribute: 'Dexterity',
                        value: '30'
                    },
                    {
                        id: 'PERCEPTION',
                        attribute: 'Perception',
                        value: '10'
                    },
                    {
                        id: 'STRENGTH',
                        attribute: 'Strength',
                        value: '-30'
                    },
                    {
                        id: 'INTELLIGENCE',
                        attribute: 'Intelligence',
                        value: '-20'
                    },
                    {
                        id: 'VITALITY',
                        attribute: 'Vitality',
                        value: '-10'
                    }
                ],
                description: 'The lizardfolk are quite traditional and prefer isolation in their ancestral swamps rather than dwelling in urban cities. They are very community driven and coexist in scattered tribes. Moreover, lizardfolk thrive in patriarchal societies, so each tribe is led by the strongest male, typically its champion, and a wise shaman to provide him counsel. Due to the permanence of their settlements and profound ancestry, they are highly territorial over their land. It is an unspoken rule among the tribes to respect boundaries and sacred locations such as burial grounds. Hence, these tribes are very distrusting to outsiders, and trespassing can easily anger them. \n\nIn general, society thinks little of lizardfolk which is attributed to their bestial appearance and overall lack of technological advancement. They are reptilian humanoids that stand 6-7 feet in height. Their scales can range in several earthy hues, and some have frills, spikes, or spines atop their heads. In addition, their tails are on average four feet in length and are powerful enough to act as a club in battle or as a paddle when swimming. Lizardfolk still perform mating rituals, so the females will often adorn themselves with jewelry and piercings to appear more desirable. It is very rare to see lizardfolk out of their element, yet it is becoming more frequent as the younger lizardmen turn to adventuring instead of conventional, tribal roles. \n\nIn the grand scheme of the realm, lizardfolk are neutral and are not aligned with any of the races. They prefer keeping to themselves and observing conflict from afar. This does not mean their incapable of fighting. Their various tribes produce a wide range of formidable warriors, and it\'s not uncommon for them to hold tournaments to determine a champion. Despite their bulky size, they also have high dexterity which allows them to learn hunting and trapping. Some tribes booby trap their territories, and when in the marshes, the unlucky adventurer has often tumbled into a pit of spikes. '
            },
            {
                id: 'GNOME',
                name: 'Gnome',
                attributeBonus: [
                    {
                        id: 'INTELLIGENCE',
                        attribute: 'Intelligence',
                        value: '30'
                    },
                    {
                        id: 'WILLPOWER',
                        attribute: 'Willpower',
                        value: '10'
                    },
                    {
                        id: 'STRENGTH',
                        attribute: 'Strength',
                        value: '-30'
                    },
                    {
                        id: 'VITALITY',
                        attribute: 'Vitality',
                        value: '-20'
                    },
                    {
                        id: 'DEXTERITY',
                        attribute: 'Dexterity',
                        value: '-10'
                    }
                ],
                 description: 'Standing at only 3 feet tall, gnomes are probably the most misunderstood of the races. It is difficult to define the appearance of a gnome because it can vary so drastically. A gnome\'s eyes, hair, and skin can be any color under the sun, and by all accounts, the inheritance of this vibrant coloration is completely random. Many societies struggle to connect with gnomes due to their minute size, and it is easy for an individual to feel superior to their race. For the most part, gnomes consider the taller folk such as humans to be dullards and simpletons. By comparison, gnomes are quite intelligent and prefer working as engineers and inventors. If their race wasn\'t so scattered, they would be exceptionally advanced. \n\nNonetheless, most gnomes refuse to settle down. By nature, they are wanderers and adventurers, and it is unusual for their kind to create lasting relationships. So, being ambushed by a band of gnomes is a complete myth. If an individual were to be attacked, he would have a distinct advantage because gnomes are slow and have terrible reflexes. \n\nThe same cannot be said about a gnome\'s mind. If a gnome isn\'t squandering his talents with humorous pranks, he is tinkering with a new project or following his passions. Gnomes typically pick one subject to pursue, research, and master throughout their entire life. They are constantly traveling to new locations to further their study. If they do settle down, it\'s typically because they\'re researching in the area, and it\'s not likely that they\'ll stay forever. Even though gnomes appear eccentric to the other races, they get along fairly well with them and dwell in diverse environments. This is why gnomes can be found anywhere in the realm. '
            },
            {
                id: 'DRACONIC',
                name: 'Draconic',
                attributeBonus: [
                    {
                        id: 'WILLPOWER',
                        attribute: 'Willpower',
                        value: '30'
                    },
                    {
                        id: 'ENDURANCE',
                        attribute: 'Endurance',
                        value: '10'
                    },
                    {
                        id: 'DEXTERITY',
                        attribute: 'Dexterity',
                        value: '-30'
                    },
                    {
                        id: 'SWIFTNESS',
                        attribute: 'Swiftness',
                        value: '-20'
                    },
                    {
                        id: 'PERCEPTION',
                        attribute: 'Perception',
                        value: '-10'
                    }
                ],
                description: 'One of the more mystical races, draconics were born from dragonblood, fire, and magic. Scholars covet the genesis of this ancient race, but most of it has been lost to time, especially since the eldest draconics have passed on and turned to stone. These elders seemingly left no records behind, save for a few cave runes and inscriptions. Even so, not many draconics can decipher these relics because their language has transformed drastically over time. A few of them strive to uncover their race\'s ancient past, but unfortunately, their efforts have been in vain. As a result, there are no known draconic gods. If there were any, they lost their fellowships long ago. Nowadays, draconics worship numerous gods from a multitude of races, namely the human gods, and they usually earn high, spiritual standing within these denominations.\n\nDraconics stand 7-8 feet tall and rival orcs in brute strength and endurance. They are fairly humanoid and are covered in scales which can range in bronze, golden, or scarlet tones. Their scales act as a natural armor and can be difficult to penetrate, especially on their backsides, shoulders, forearms, and thighs. Draconics mature faster than any other race and reach adulthood at age fifteen, granting them a distinct advantage in terms of building settlements and armies. Unlike their dragon ancestors, they cannot breath flame.\n\nHowever, they are born with magic in their veins and are adept at elemental magic. By devoting their immense willpower to a specific class, they can easily master it. Most of their race become paladins, versed in magic and swordplay, and their hand-to-hand combat is exemplary. Draconics are the only creatures that consistently hold the orcs\' respect, making them commonplace allies. This is not to say that draconics do not ally with the other races. Due to their broad religious preferences, draconics are received cordially by most communities.'
            }
        ];

        $scope.decreaseRace = function () {
            if ($scope.visibleRace == 0) {
                $scope.visibleRace = $scope.race.length - 1;
            } else {
                $scope.visibleRace--;
            }
        };

        $scope.increaseRace = function () {
            if ($scope.visibleRace == $scope.race.length - 1) {
                $scope.visibleRace = 0;
            } else {
                $scope.visibleRace++;
            }
        };

        $scope.submit = function (valid) {
            if (valid) {
                var dataToSend = $scope.user;

                dataToSend.race = $scope.race[$scope.visibleRace].id;

                $http.post('https://api.daggersandsorcery.com/user/register', dataToSend).then(function (response) {
                    $scope.errorList = [];

                    var loginData = {
                        username: $scope.user.username,
                        password: $scope.user.passwordFirst
                    };
                    $http.post('https://api.daggersandsorcery.com/user/login', loginData).then(function (response) {
                        if (response.data.data.result.successful === true) {
                            $log.debug('Successful login!');

                            $rootScope.previouslyLoggedIn = true;

                            $http.get('https://api.daggersandsorcery.com/user/info').then(function (infoResponse) {
                                $rootScope.user.loggedIn = infoResponse.data.data.loggedIn;
                                $rootScope.user.witchuntersGuildUnlocked = infoResponse.data.data.witchuntersGuildInfo.witchhuntersGuildUnlocked;

                                $state.go('home', {}, {reload: true});
                            });
                        } else {
                            $scope.error = true;
                        }
                    });
                }).catch(function (response) {
                    $scope.errorList = response.data;
                });
            }
        };

        $scope.raceAttributeModifierCount = function (raceId) {
            return Object.keys($scope.race[raceId].attributeBonus).length;
        };

        $scope.getAttributeImage = function (attribute) {
            return require('image/attribute/icon/' + attribute + '.png');
        };

        $scope.getRaceImage = function(race) {
            return require('image/icon/race/' + race + '.png');
        }
    }
};