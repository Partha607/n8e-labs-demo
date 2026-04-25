const fs = require('fs');
let data = fs.readFileSync('mapdata.js', 'utf8');

const neStates = ['INAR', 'INAS', 'INML', 'INNL', 'INMN', 'INMZ', 'INTR', 'INSK'];

data = data.replace(/([A-Z]{4}):\s*\{([^}]*)\}/g, (match, stateCode, innerProps) => {
    if (!neStates.includes(stateCode)) {
        return `${stateCode}: {${innerProps}, hide: "yes"}`;
    }
    return match;
});

data = data.replace('initial_zoom: "-1"', 'initial_zoom: "' + neStates.join(',') + '"');
data = data.replace('initial_zoom_solo: "no"', 'initial_zoom_solo: "yes"');
data = data.replace('state_color: "#88A4BC"', 'state_color: "rgba(0, 229, 255, 0.1)"');
data = data.replace('state_hover_color: "#3B729F"', 'state_hover_color: "rgba(0, 229, 255, 0.4)"');
data = data.replace('border_color: "#ffffff"', 'border_color: "#00E5FF"');
data = data.replace('border_size: 1.5', 'border_size: 2');

fs.writeFileSync('mapdata_modified.js', data);
console.log('Modified mapdata successfully!');
