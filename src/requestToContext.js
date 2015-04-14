var url = require('url');
module.exports = function requestToContext(req) {
    var urlValue = url.parse(req.url);
    var context = {};
    if (urlValue.query) {
        context = urlValue.query.
            split('&').
            reduce(function(acc, q) {
            var queryParam = q.split('=');
            acc[queryParam[0]] = decodeURIComponent(queryParam[1]);
            if (queryParam[0] === 'path') {
                // optional, Falcor endpoint will take care of that.
                acc[queryParam[0]] = JSON.parse(acc[queryParam[0]]);
            }
            return acc;
        }, {});
    }
};
