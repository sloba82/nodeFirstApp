// built in module

const path = require('path');
const os = require('os');

var pathObj = path.parse(__filename);
console.log(pathObj);

var totalMemory = os.totalmem();
console.log(totalMemory);

var freeMemory = os.freemem();
console.log(freeMemory);

//templete string

var temp = `total memory: ${totalMemory}
freeMemory: ${freeMemory}`;

console.log(temp);


// file sistem
const fs = require('fs');

const files = fs.readdirSync('./');
console.log(files);

fs.readdir( './', function (err, files) {
    if (err) console.log('Error ', err);
    else console.log('Files ', files);
});





