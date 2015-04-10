var Rx = require('rx');
var url = require('url');

/**
 * @param {JSONGModel} model
 * @type {FalkorEndpoint}
 */
var FalkorEndpoint = function(model) {
    this._model = model;
};

FalkorEndpoint.prototype = {
    /**
     *
     * @param {Object} context the context object which is the query parameters and any other
     * useful information required by falkor
     * @param {Function} [callback] The callback when done.
     */
    execute: function(context, callback) {
        var obs;
        try {
            if (context.method && context.path) {
                if (typeof context.path === 'string') {
                    context.path = JSON.parse(context.path);
                }
                var method = context.method;
                if (method === 'call') {
                } else {
                    // no need to materialize since json always returns errors as values.
                    obs = this._model[method].apply(this._model, context.path).
                        toJSONG();
                }
            } else {
                throw 'Expected method and path to be defined in the context object.';
            }
        } catch (e) {
            obs = Rx.Observable.throw(e);
        }

        obs.
            subscribe(function(x) {
                callback(null, JSON.stringify(x));
            }, function(err) {
                callback(err);
            });
    },

    fromHttpRequest: function(req, cb) {
        var urlValue = url.parse(req.url);
        var context = {};
        if (urlValue.query) {
            context = urlValue.query.
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
        }
        this.execute(context, cb);
    }
};

module.exports = FalkorEndpoint;
