var path = require('path');  
var http = require('http');

var staticBasePath = './Blockchain-Cow-Milk';

var staticServe = function(req, res) {
    var resolvedBase = path.resolve(staticBasePath);
    var safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
    var fileLoc = path.join(resolvedBase, safeSuffix);

    res.statusCode = 200;

    res.write(fileLoc);
    return res.end();
};

var httpServer = http.createServer(staticServe);

httpServer.listen(8040);