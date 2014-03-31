var superagent = require('superagent'),
  chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

describe('Index', function () {
  it('renders HTML', function () {
    superagent.get('http://localhost:3000/')
      .end(function (e, res) {
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        done();
      });
  });
});