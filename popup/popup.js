document.addEventListener("DOMContentLoaded", function () {
    refreshFriendsList();

    var addFriendElement = document.getElementById('add-friend');

    addFriendElement.addEventListener('click', function () {
        addFriend(document.getElementById('new-friend').value)
            .then(refreshFriendsList);
    });
});

function refreshFriendsList() {
    document.getElementById('new-friend').value = '';

    Array.from(document.querySelectorAll('.friend')).forEach(function (el) {
        el.parentNode.removeChild(el);
    });

    loadFriends().then(function (friends) {
        friends.forEach(function (friend, i) {
            var friendsList = document.getElementById('friends-list'),
                newItem = document.getElementById('new-item'),
                li = document.createElement('li'),
                removeButton = document.createElement('button');
                friendSpan = document.createElement('span');

            removeButton.innerHTML = 'remove';
            removeButton.classList.add('remove-btn');

            friendSpan.innerHTML = friend.name;
            li.appendChild(friendSpan);
            li.classList.add('friend');
            li.dataset.index = i;
            li.appendChild(removeButton);

            friendsList.insertBefore(li, newItem);
        });

        Array.from(document.querySelectorAll('.friend .remove-btn')).forEach(function (friend) {
            friend.addEventListener('click', function (e) {
                var index = e.target.closest('.friend').dataset.index;
                friends.splice(index, 1);
                chrome.storage.sync.set({'friends': friends}, refreshFriendsList);
            })
        });
    });
}
