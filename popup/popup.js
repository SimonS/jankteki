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
        friends.forEach(function (friend) {
            var friendsList = document.getElementById('friends-list'),
                newItem = document.getElementById('new-item'),
                li = document.createElement('li'),
                removeButton = document.createElement('button');
                friendSpan = document.createElement('span');

            removeButton.innerHTML = 'remove';
            removeButton.classList.add('remove-btn');
            removeButton.dataset.forUser = friend;

            friendSpan.innerHTML = friend;
            li.appendChild(friendSpan);
            li.classList.add('friend');

            li.appendChild(removeButton);

            friendsList.insertBefore(li, newItem);
        });

        Array.from(document.querySelectorAll('.friend .remove-btn')).forEach(function (friend) {
            friend.addEventListener('click', function (e) {
                removeFriend(e.target.dataset.forUser).then(refreshFriendsList);
            })
        });
    });
}
