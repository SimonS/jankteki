var assert = require('chai').assert;
var sinon = require('sinon');

var loadOptions = require('../../lib/options').loadOptions;

describe('options adapter', function () {
    before(function () {
        global.chrome = require('sinon-chrome');
        chrome.storage.sync.get = sinon.stub();
    });

    describe('#loadOptions()', function () {
        it('should return options in a promise', function () {
            var expectedOptions = ['horizontalScrolling'];
            chrome.storage.sync.get.callsArgWith(1, {'options': expectedOptions});

            return loadOptions().then(function (result) {
                assert.deepEqual(result, expectedOptions);
            });
        });
    });
});
