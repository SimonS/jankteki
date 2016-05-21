var assert = require('chai').assert;
var sinon = require('sinon');

var loadFriends = require('../../lib/friends').loadFriends;

describe('friends', function () {
    before(function () {
        global.chrome = require('sinon-chrome');
        chrome.storage.sync.get = sinon.stub();
    });

    describe('#loadFriends()', function () {
        it('should return an empty set when there are no friends', function () {
            chrome.storage.sync.get.callsArgWith(1, {})

            return loadFriends().then(function (result) {
                assert.deepEqual(result, new Set());
            });
        });

        it('should return friends when there are some present', function () {
            var expectedFriends = ['friend1', 'friend2'];
            chrome.storage.sync.get.callsArgWith(1, {'friends': expectedFriends});

            return loadFriends().then(function (result) {
                assert.deepEqual(result, new Set(expectedFriends));
            });
        });
    });
});
