//TODO: REmove this! Whe should query this data from the server or (the better approach) doesn't even need it because the
//server provide everything very correctly with these values already mapped to the correct spots.
module.exports = require('js/app.js').constant('ATTRIBUTE_BONUS_MAP', {
    'INITIAL': 'Initial value',
    'RACIAL': 'Racial bonus',
    'SKILL': 'Skill bonus',
    'LEVEL': 'Skill level',
    'MINIMUM': 'To meet the minimum',
    'GENERAL_ATTRIBUTE': 'General attribute bonus',
    'EQUIPMENT': 'Equipment bonus'
});