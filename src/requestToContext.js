"use strict";

var url = require("url");

var parseArgs = {
  'jsong': true,
  'callPath': true,
  'arguments': true,
  'pathSuffixes': true,
  'paths': true
};

module.exports = function requestToContext(req) {
    var queryString = req.method === "POST" ? req.body : url.parse(req.url).query;
    var context = {};
    if (queryString) {
        context = queryString.
            split("&").
            reduce(function(acc, q) {
                var queryParam = q.split("=");
                acc[queryParam[0]] = decodeURIComponent(queryParam[1]);

                if (parseArgs[queryParam[0]]) {
                    // optional, Falcor endpoint will take care of that.
                    acc[queryParam[0]] = JSON.parse(acc[queryParam[0]]);
                }
                return acc;
            }, {});
    }
    return context;
};
