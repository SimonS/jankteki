function loadFriends () {
    return new Promise(function (resolve, reject) {
        // TODO - don't query storage on every mutate. Cache internally?
        chrome.storage.sync.get(['friends'], function (items) {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }

            var friends = (items.friends || []).map(
                friend => friend.hasOwnProperty('name') ?
                    friend :
                    new User(friend));

            resolve(friends);
        });
    });
}

function addFriend (name) {
    return new Promise(function (resolve) {
        loadFriends().then(function (friends) {
            if (name.trim() !== '') {
                var user = new User(name);
                friends.push(user);

                chrome.storage.sync.set({'friends': friends}, function () {
                    var notificationOption = {
                        type: 'basic',
                        title: 'Friend added',
                        message: user.name + ' added as a friend',
                        iconUrl: '../icons/icon128.png'
                    };

                    chrome.notifications.create(
                        'friendAdded', notificationOption, function () {}
                    );

                    return resolve();
                });
            }
        })
    });
}
