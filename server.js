let http = require('http');
let static = require('node-static');
let file = new static.Server('.');
const PORT = process.env.PORT || 10000


http.createServer(function(req, res) {
    file.serve(req, res);
}).listen(PORT);

console.log(`Server running on port ${ PORT }`);