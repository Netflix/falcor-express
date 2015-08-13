"use strict";

var url = require("url");

var parseArgs = {
    "jsonGraph": true,
    "callPath": true,
    "arguments": true,
    "pathSuffixes": true,
    "paths": true
};

module.exports = function requestToContext(req) {
    var queryMap = req.method === "POST" ? req.body : url.parse(req.url, true).query;

    var context = {};
    if (queryMap) {
        Object.keys(queryMap).forEach(function(key) {
            var arg = queryMap[key];

            if (parseArgs[key] && arg) {
                context[key] = JSON.parse(arg);
            } else {
                context[key] = arg;
            }
        });
    }

    return context;
};
