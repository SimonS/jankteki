document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.sync.get(['friends'], function (items) {
        var friends = items.friends || [];

        friends.forEach(function (friend) {
            var friendsList = document.getElementById('friends-list'),
                newItem = document.getElementById('new-item'),
                li = document.createElement('li');

            li.innerHTML = friend;

            friendsList.insertBefore(li, newItem);
        })
    });

    var addFriend = document.getElementById('add-friend');

    addFriend.addEventListener('click', function () {
        chrome.storage.sync.get(['friends'], function (items) {
            var newFriend = document.getElementById('new-friend').value,
                friends = items.friends || [];

            if (newFriend.trim() !== '') {
                friends.push(newFriend);
                chrome.storage.sync.set({'friends': friends}, function () {});
            }
        });
    });
});
