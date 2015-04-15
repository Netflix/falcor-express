var Rx = require('rx');
var requestToContext = require('./requestToContext');
var execute = require('./execute');
var FalcorEndpoint = module.exports = {};

FalcorEndpoint.expressMiddleware = function(getModel) {
    return function(req, res, next) {
        var context = requestToContext(req);
        execute(getModel(req, res), context, function(err, jsong) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(JSON.stringify(jsong));
            }
        });
    };
};

