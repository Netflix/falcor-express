# falcor-express
Server middleware for falcor-express

Working usage example of the basic repro in example/

## Usage
Minimalistic example

```
var FalcorServer = require('falcor-express');
var express = require('express');
var app = express();

var TestRouter = <your router here>;
var _TestRouter = new TestRouter();

var app = new Hapi.Server();
app.connection({
    host: "localhost",
    port: 9090
});

app.use('/model.json', FalcorServer.expressMiddleware(_TestRouter));

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
To develop this server further run
```
clone repo
npm install
```
then go in the test example folder, copy ``falcor.browser.js`` from your ``falcor/dist`` and run
```
npm install
npm start
```
You might want to symlink falcor-express inside your node_modules to the local version rather than the github/npm one.

Please run linting before pushing on repo
```
npm run lint
```

## Todo
 * Create mocha test for regression and development instad of using example  
 * Test post parameters once set/call are developed  
 