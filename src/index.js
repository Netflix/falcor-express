"use strict";
var requestToContext = require("./requestToContext");
var FalcorEndpoint = module.exports = {};

FalcorEndpoint.expressMiddleware = function(getDataSource) {
    console.warn("expressMiddleware is deprecated, use dataSourceRoute instead");
    this.dataSourceRoute(getDataSource);
};

FalcorEndpoint.dataSourceRoute = function(getDataSource) {
    return function(req, res, next) {
        var obs;
        var dataSource = getDataSource(req, res);
        var context = requestToContext(req);
        // probably this should be sanity check function?
        if (Object.keys(context).length === 0) {
            return res.status(500).send("Request not supported");
        }
        if (typeof context.method === "undefined" || context.method.length === 0) {
            return res.status(500).send("No query method provided");
        }
        if (typeof dataSource[context.method] === "undefined") {
            return res.status(500).send("Data source does not implement the requested method");
        }

        if (context.method === "set") {
            obs = dataSource[context.method](context.jsonGraph);
        } else if (context.method === "call") {
            obs = dataSource[context.method](context.callPath, context.arguments, context.pathSuffixes, context.paths);
        } else {
            obs = dataSource[context.method]([].concat(context.paths));
        }

        obs.subscribe(function(jsonGraphEnvelope) {
            res.status(200).json(jsonGraphEnvelope);
        }, function(err) {
            if (err instanceof Error) {
              return next(err);
            }
            res.status(500).send(err);
        });
    };
};
