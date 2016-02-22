'use strict';

var chai = require('chai');
var expect = chai.expect;
var dataSourceRoute = require('../src/index.js').dataSourceRoute;
var Router = require('falcor-router');
var sinon = require('sinon');

describe('dataSourceRoute', function () {
  describe('Can interact with data correctly', function () {
    it('Calls get method', function (done) {
      // Fake GET request
      var fakeReq = {
        method: 'get',
        url: 'http://localhost:9090/?paths=[[%22genrelist%22,{%22from%22:0,%22to%22:5},%22titles%22,{%22from%22:0,%22to%22:5},%22name%22]]&method=get'
      };

      // Stubbed response object
      var fakeRes = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis()
      };

      // Set up basic router and immediately invoke the returned funciton
      // with fake req and res objects to check on stubbed functions
      dataSourceRoute(function (req, res) {
        return new Router([{
          route: 'route',
          get: function (pathSet) {
            return null;
          }
        }]);
      })(fakeReq, fakeRes);

      expect(fakeRes.status.calledOnce).to.equal(true);
      expect(fakeRes.status.args).to.deep.equal([[200]]);

      expect(fakeRes.json.calledOnce).to.equal(true);
      // Check that the res.send was called with a jsonGraph object
      var sentValue = fakeRes.json.args[0][0];
      expect(typeof(sentValue)).to.equal('object');
      expect(!!sentValue.jsonGraph).to.equal(true);

      done();
    });

    it('Calls set method', function (done) {
      // Fake POST request
      var fakeReq = {
        method: 'POST',
        body: {
          jsonGraph: '{"genrelist":{"0":{"titles":{"0":{"name":"jon"}}}},"paths":[["genrelist",0,"titles",0,"name"]]}',
          method: 'set'
        }
      };

      // Stubbed response object
      var fakeRes = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis()
      };

      // Set up basic router and immediately invoke the returned funciton
      // with fake req and res objects to check on stubbed functions
      dataSourceRoute(function (req, res) {
        return new Router([{
          route: 'route',
          set: function (pathSet) {
            return null;
          }
        }]);
      })(fakeReq, fakeRes);

      expect(fakeRes.status.calledOnce).to.equal(true);
      expect(fakeRes.status.args).to.deep.equal([[200]]);

      expect(fakeRes.json.calledOnce).to.equal(true);
      // Check that the res.send was called with a jsonGraph object
      var sentValue = fakeRes.json.args[0][0];
      expect(typeof(sentValue)).to.equal('object');
      expect(!!sentValue.jsonGraph).to.equal(true);

      done();
    });
  });
});
