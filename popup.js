document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.sync.get(['friends'], function (items) {
        var friends = items.friends || [];

        friends.forEach(function (friend, i) {
            var friendsList = document.getElementById('friends-list'),
                newItem = document.getElementById('new-item'),
                li = document.createElement('li'),
                removeButton = document.createElement('button');

            removeButton.innerHTML = 'remove';
            removeButton.classList.add('remove-btn');

            li.innerHTML = friend;
            li.classList.add('friend');
            li.dataset.index = i;
            li.appendChild(removeButton);

            friendsList.insertBefore(li, newItem);
        });

        Array.from(document.querySelectorAll('.friend .remove-btn')).forEach(function (friend) {
            friend.addEventListener('click', function (e) {
                var index = e.target.closest('.friend').dataset.index;

                friends.splice(index, 1);
                chrome.storage.sync.set({'friends': friends}, function () {});
            })
        });
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
