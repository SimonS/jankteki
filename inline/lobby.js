var observer = new MutationObserver(function () {
    if (document.querySelector('#gamelobby').style.display !== "none") {
        var pinned = getOrCreatePinned();

        loadFriends().then(function (friends) {
            var friendNames = Array.from(friends).map(friend => friend.toLowerCase());
            var onlineFriends = getAllPlayers()
                .filter(player => friendNames.includes(player.innerText.toLowerCase()));

            pinned.innerHTML = '';
            Array.from(document.querySelectorAll('.gameline'))
                .forEach(game => game.id = '');

            onlineFriends.forEach(function (player, i) {
                var target = 'friend-' + i;
                player.id = target;
                var li = document.createElement('li');
                li.innerHTML = '<a href="#' + target + '">' + player.innerText + '</a>';

                pinned.appendChild(li);
            });

            if (onlineFriends.length === 0) {
                var li = document.createElement('li');
                li.innerHTML = 'Nobody is playing.<br />◉︵◉';

                pinned.appendChild(li);
            }
        });

        // hover link for short note, click to go to full user page
        var userClass = 'jankteki-user';
        Array.from(document.querySelectorAll(`.${userClass}`)).forEach(function (user) {
            user.classList.remove(userClass, 'known-user');
            user.dataset.notes = '';
        });

        var encodeUser = u => `jankteki-${encodeURI(u.innerHTML)}`;

        var users = Array.from(document.querySelectorAll('.player > .avatar + span'));
        users.forEach(function (user) {
            user.classList.add(userClass);
            user.dataset.username = encodeUser(user);
        });

        var usernames = users.map(encodeUser);

        chrome.storage.sync.get(usernames, function (storedUsers) {
            Object.keys(storedUsers).forEach(function (u) {
                storedUsers[u].name = u;
                var userObject = new User(storedUsers[u]);

                var userEl = document.querySelector(`span[data-username="${u}"]`);
                userEl.classList.add('known-user');
                userEl.dataset.notes = userObject.summary;

                if (userEl.closest('.gameline').id) {
                    var id = userEl.closest('.gameline').id;
                    match = id.match(/friend-(\d)/)[0];

                    var friendLine = document.createElement('span');
                    friendLine.innerHTML = ' - ' + userObject.summary;
                    friendLine.classList.add('summary');

                    var linkParent = document.querySelector(`a[href="#${match}"]`).parentElement;
                    if (!linkParent.querySelector('.summary')) {
                        linkParent.appendChild(friendLine);
                    }
                }
            });
        });
    }
});

document.querySelector('.lobby').addEventListener('click', function(e) {
    if (e.target.classList.contains('known-user')) {
        chrome.runtime.sendMessage({action: 'user-page', user: e.target.textContent});
    }
});

var gameList = document.querySelector('.game-list');
observer.observe(gameList, {childList: true});

function getAllPlayers () {
    return Array.from(
        document.querySelectorAll('.user-status > span:first-child')
    );
}

function getOrCreatePinned () {
    var pinnedArea = document.getElementById('pinnedArea');

    if (pinnedArea) {
        return pinnedArea;
    }

    var pinnedContainer = document.createElement('div');
    pinnedContainer.className = 'pinned-container';

    pinnedContainer.innerHTML = '<h4 class="friends-title">Friends playing right now:</h4>';

    pinnedArea = document.createElement('ul');
    pinnedArea.id = "pinnedArea";

    pinnedContainer.appendChild(pinnedArea);

    gameList.parentNode.insertBefore(pinnedContainer, gameList);

    return pinnedArea;
}
