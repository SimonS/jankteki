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
