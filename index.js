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
            debugger;
            if (context.method && context.path) {
                if (typeof context.path === 'string') {
                    context.path = JSON.parse(context.path);
                }
                var method = context.method;
                if (method === 'call') {
                } else {
                    // no need to materialize since json always returns errors as values.
                    obs = this._model[method](context.path).
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
    }
};

module.exports = FalkorEndpoint;
