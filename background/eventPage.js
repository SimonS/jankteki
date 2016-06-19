var jintekiTab, userTab;

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

chrome.contextMenus.create({
    title: "User profile: %s",
    contexts:["selection"],
    id: "seeUserContext"
});

chrome.contextMenus.onClicked.addListener(function(info) {
    if (info.menuItemId === "addFriendContext") {
        addFriend(info.selectionText);
    }
    if (info.menuItemId === "seeUserContext") {
        goToUser(info.selectionText);
    }
});

chrome.runtime.onMessage.addListener(function(request) {
    if (request.action == "user-page") {
        goToUser(request.user);
    }

    if (request.action == "close-user") {
        closeUser();
    }
});

function goToUser(user) {
    chrome.tabs.getSelected(function (currentTab) {
        jintekiTab = currentTab.id;

        chrome.tabs.create({url: "pages/user.html?user=" + user}, function (tab) {
            userTab = tab.id;
        });
    })
}

function closeUser() {
    chrome.tabs.remove(userTab, function () {
        chrome.tabs.update(jintekiTab, {active: true});
    });
}
