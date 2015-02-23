var http = require('http');
var falkor = require('falcor');
var Rx = require('rx');
var url = require('url');
var model = new falkor.JSONGModel(null, 0, 0, require('./Cache')());
var FalkorEndpoint = require('./../index');
var falkorEndpoint = new FalkorEndpoint(model);

http.
    createServer(function(req, res) {
        var urlValue = url.parse(req.url);
        if (urlValue.path.indexOf('/falkor') === 0) {
            falkorEndpoint.fromHttpRequest(req, function(err, jsonString) {
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

