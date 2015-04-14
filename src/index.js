var Rx = require('rx');
var requestToContext = require('./requestToContext');
var execute = require('./execute');

FalcorEndpoint.ExpressMiddleware = function(model) {
    return function(req, res, next) {
        var context = requestToContext(req);
        execute(context, function(err, jsong) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(JSON.stringify(jsong));
            }
        });
    };
};

module.exports = FalcorEndpoint;
