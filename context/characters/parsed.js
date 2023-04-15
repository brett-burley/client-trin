const fs = require('fs');

const common = JSON.parse(fs.readFileSync('parsed.json'));
console.log(common);
