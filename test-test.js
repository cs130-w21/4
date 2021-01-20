var assert = require('assert'),
    vows = require('vows'),
    testing_test = require('../');

vows.describe('test-calculations').addBatch({
  'when performing test calculations': {
    topic: function() {
      return testing_test.test(4);
    },
    'result should be valid': function (topic) {
      assert.isNumber(topic);
      assert.equal(topic, 8);
    }
  }
}).export(module);
