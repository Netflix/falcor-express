# falcor-express
Server middleware for falcor-express

Working usage example of the basic repro in example/

## Usage
Minimalistic example

```
var FalcorServer = require('falcor-express');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var TestRouter = <your router here>;
var _TestRouter = new TestRouter();

app.use(bodyParser.text({ type: 'text/*' }))
app.use('/model.json', FalcorServer.dataSourceRoute(function(req, res) {
    return new TestRouter();
}));

app.use(express.static('.'));

var server = app.listen(9090, function(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("navigate to http://localhost:9090")
});

```

## Development
Please run linting before pushing on repo
```
npm run lint
```

## Todo
 * Create mocha test for regression and development instad of using example
