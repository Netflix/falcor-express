'use strict';

var chai = require('chai');
var expect = chai.expect;
var requestToContext = require('../src/requestToContext');

describe('requestToContext', function () {
  describe('Converts the request to the correct context', function () {
    it('For get requests', function (done) {
      var result = requestToContext({
        method: 'get',
        url: 'http://localhost:9090/?paths=[[%22genrelist%22,{%22from%22:0,%22to%22:5},%22titles%22,{%22from%22:0,%22to%22:5},%22name%22]]&method=get'
      });

      expect(result).to.deep.equal({
        paths: [
          [
            'genrelist', {
              from: 0,
              to: 5
            },
            'titles', {
              from: 0,
              to: 5
            },
            'name'
          ]
        ],
        method: 'get'
      });

      done();
    });

    it('For post requests', function (done) {
      var result = requestToContext({
        method: 'POST',
        body: {
          jsonGraph: '{"jsonGraph":{"genrelist":{"0":{"titles":{"0":{"name":"jon"}}}},"paths":[["genrelist",0,"titles",0,"name"]]}}',
          method: 'set'
        }
      });

      expect(result).to.deep.equal({
        jsonGraph: {
          jsonGraph: {
            "genrelist": {
              "0": {
                "titles": {
                  "0": {
                    "name": "jon"
                  }
                }
              }
            },
            "paths": [
              ["genrelist", 0, "titles", 0, "name"]
            ]
          }
        },
        method: 'set'
      });

      done();
    });
  });
});
