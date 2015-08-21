# falcor-express
Server middleware for falcor-express

Working usage example of the basic repro in netflix/falcor-express-demo

## Usage
Minimalistic example

```javascript
var FalcorServer = require('falcor-express');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var TestRouter = <your router here>;

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

Example of using a static model (for development purposes only)

```javascript
var falcor = require('falcor');
var FalcorServer = require('falcor-express');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var model = new falcor.Model({
    cache: {
        todos: [
            {
                name: 'get milk from corner store',
                done: false
            },
            {
                name: 'withdraw money from ATM',
                done: true
            }
        ]
    }
});

app.use(bodyParser.text({ type: 'text/*' }))
app.use('/model.json', FalcorServer.dataSourceRoute(function(req, res) {
    return model.asDataSource();
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
Before contributing, please run the linter and the tests to be sure there are no issues.
```
npm run lint
```
and
```
npm run test
```
