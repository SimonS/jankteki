// as far as Jankteki is concerned, friends is a set of IDs
// internally, however, Chrome stores these as an array.
// this is a very thin Array -> Set converter
function loadFriends () {
    return new Promise(function (resolve, reject) {
        // TODO - don't query storage on every mutate. Cache internally?
        chrome.storage.sync.get(['friends'], function (items) {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }

            if (JSON.stringify(items.friends) === JSON.stringify({})) {
                items.friends = [];
            }

            resolve(new Set(items.friends));
        });
    });
}

function addFriend (name) {
    return new Promise(function (resolve) {
        loadFriends().then(function (friends) {
            if (name.trim() !== '') {
                friends.add(name);

                chrome.storage.sync.set({'friends': Array.from(friends)}, function (result) {
                    var notificationOption = {
                        type: 'basic',
                        title: 'Friend added',
                        message: name + ' added as a friend',
                        iconUrl: '../icons/icon128.png'
                    };

                    chrome.notifications.create(
                        'friendAdded', notificationOption, function () {}
                    );

                    return resolve(result);
                });
            }
        })
    });
}

function removeFriend (name) {
    return new Promise(function (resolve) {
        loadFriends().then(function (friends) {
            if (name.trim() !== '') {
                friends.delete(name);

                chrome.storage.sync.set({'friends': Array.from(friends)}, function (result) {
                    var notificationOption = {
                        type: 'basic',
                        title: 'Friend deleted',
                        message: name + ' deleted from your friends list',
                        iconUrl: '../icons/icon128.png'
                    };

                    chrome.notifications.create(
                        'friendDeleted', notificationOption, function () {}
                    );

                    return resolve(result);
                });
            }
        })
    });
}

var Friends = {
    loadFriends: loadFriends
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Friends;
}
