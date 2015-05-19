var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var FalcorServer = require('falcor-server');
var falcor = require('falcor');
var Rx = require('rx');
var Router = require('falcor-router');
var $ref = falcor.Model.ref;

app.use(bodyParser.text({ type: 'text/*' }))

function TestRouter(request) {
    this._request = request;
}

TestRouter.prototype = new Router([
    {
        route: "titlesById[{integers}].name",
        get: function(pathSet) {
            var titlesById = {}
            pathSet[1].forEach(function(id) {
                titlesById[id] = {
                    name: "Jim" + id
                }
            })
            return Rx.Observable.of({
                jsong: {titlesById: titlesById}
            })
        }
    },
    {
        route: "list[{ranges}]",
        get: function(pathSet) {
            var list = {}
            pathSet[1].forEach(function(range) {
                for (var index = range.from; index <= range.to; index++) {
                    list[index] = $ref(["titlesById", index])
                }
            });
            return Rx.Observable.of({
                jsong: {list: list}
            })
        }
    }
]);

var _TestRouter = new TestRouter();

// Simple middleware to handle get/post
app.use('/model.json', FalcorServer.expressMiddleware(function(req, res) { 
    return _TestRouter;
}));
app.use(express.static('.'));

//
var server = app.listen(9090, function(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("navigate to http://localhost:9090")
});
