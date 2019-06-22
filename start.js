var path = require('path');
var http = require('http');
var fs = require('fs');

var staticBasePath = './Blockchain-Cow-Milk';

var staticServe = function (req, res) {
    var resolvedBase = path.resolve(staticBasePath);
    var safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
    var fileLoc = path.join(resolvedBase, safeSuffix);

    var stream = fs.createReadStream(fileLoc);

    // Handle non-existent file
    stream.on('error', function (error) {
        res.writeHead(404, 'Not Found');
        res.write('404: File Not Found!');
        res.end();
    });

    // File exists, stream it to user
    res.statusCode = 200;
    stream.pipe(res);

};

var httpServer = http.createServer(staticServe);

var ports = process.argv.splice(2);

httpServer.listen(ports[0], () => console.log("Running..UI APP"));
httpServer.listen(ports[1], () => console.log("Running..Back End Server"));