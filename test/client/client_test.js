/*jshint browserify: true*/

'use strict';

var expect = require('chai').expect;
var randomEventId = require('../../public/randomEventId');

var regex = /^[a-z]{5}[0-9]{2}$/;

describe('', function() {
  it('should create a random id', function() {
    expect(regex.test(randomEventId())).to.be.true;
  });
});

