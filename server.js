var http = require('http');
var falkor = require('./lib/Falkor');
var Rx = require('rx');
var url = require('url');
var model = new falkor.JSONGModel(null, 0, 0, require('./Cache')());
var FalkorEndpoint = require('./');
var falkorEndpoint = new FalkorEndpoint(model);

http.
    createServer(function(req, res) {
        var urlValue = url.parse(req.url);
        var context = urlValue.query.
            split('&').
            reduce(function(acc, q) {
                var queryParam = q.split('=');
                acc[queryParam[0]] = decodeURIComponent(queryParam[1]);
                if (queryParam[0] === 'path') {
                    // optional, Falkor endpoint will take care of that.
                    acc[queryParam[0]] = JSON.parse(acc[queryParam[0]]);
                }
                return acc;
            }, {});
        if (urlValue.path.indexOf('/falkor') === 0) {
            falkorEndpoint.execute(context, function(err, jsonString) {
                if (err) {
                    res.writeHead(500);
                    res.write(err);
                } else {
                    res.writeHead(200);
                    res.write(jsonString);
                }
                res.end();
            });
        } else {
            res.writeHead(404);
            res.end();
        }
    }).
    listen(1337);

