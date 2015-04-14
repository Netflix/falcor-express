module.exports = function execute(model) {
    return function(context, callback) {
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
                    obs = model[method].apply(model, [].concat(context.path)).
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
                callback(null, x);
            }, function(err) {
                callback(err);
            });
    };
};
