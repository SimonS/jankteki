chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {urlContains: 'jinteki.net'}
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.contextMenus.create({
    title: "Add friend: %s",
    contexts:["selection"],
    id: "addFriendContext"
});

chrome.contextMenus.onClicked.addListener(function(info) {
    if (info.menuItemId === "addFriendContext") {
        loadFriends().then(function (friends) {
            var newFriend = info.selectionText;

            if (newFriend.trim() !== '') {
                friends.push(newFriend);
                chrome.storage.sync.set({'friends': friends}, function () {
                    var notificationOption = {
                        type: 'basic',
                        title: 'Friend added',
                        message: newFriend + ' added as a friend',
                        iconUrl: 'icons/icon128.png'
                    };

                    chrome.notifications.create(
                        'friendAdded', notificationOption, function () {}
                    );
                });
            }
        });
    }
});
