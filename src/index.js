"use strict";
var requestToContext = require("./requestToContext");
var FalcorEndpoint = module.exports = {};

FalcorEndpoint.expressMiddleware = function(getDataSource) {
    console.warn("expressMiddleware is deprecated, use dataSourceRoute instead");
    this.dataSourceRoute(getDataSource);
};

FalcorEndpoint.dataSourceRoute = function(getDataSource) {
    return function(req, res) {
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
        var path = (Array.isArray(context.path)) ? [].concat(context.path) : context.path;
        dataSource[context.method](path).subscribe(function(jsong) {
            res.status(200).send(JSON.stringify(jsong));
        }, function(err) {
            res.status(500).send(err);
        });
    };
};

