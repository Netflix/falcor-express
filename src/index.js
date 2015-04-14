var Rx = require('rx');
var requestToContext = require('./requestToContext');
var execute = require('./execute');
var FalcorEndpoint = module.exports = {};

FalcorEndpoint.ExpressMiddleware = function(model) {
    var exec = execute(model);
    return function(req, res, next) {
        var context = requestToContext(req);
        exec(context, function(err, jsong) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(JSON.stringify(jsong));
            }
        });
    };
};

