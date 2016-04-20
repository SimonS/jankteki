var observer = new MutationObserver(function () {
    if (document.querySelector('#gamelobby').style.display !== "none") {
        var pinned = getOrCreatePinned();

        loadFriends().then(function (friends) {
			var friendNames = Array.from(friends).map(friend => friend.toLowerCase());
            var onlineFriends = getAllPlayers()
                .filter(player => friendNames.indexOf(player.innerText.toLowerCase()) !== -1);

            pinned.innerHTML = '';
            Array.from(document.querySelectorAll('.gameline'))
                .forEach(game => game.id = '');

            onlineFriends.forEach(function (player, i) {
                var target = 'friend-' + i;

                var gameLine = player.closest('.gameline');
                gameLine.id = target;

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

        // This obviously needs cleaning up, but it's step one in our
        // front end user code
        var userClass = 'jankteki-user';
        Array.from(document.querySelectorAll(`.${userClass}`)).forEach(user => user.classList.remove(userClass, 'known-user'));

        var users = Array.from(document.querySelectorAll('.player > .avatar + span'));
        users.forEach(user => user.classList.add(userClass));
        users.forEach(user => user.dataset.username =`jankteki-${user.innerHTML}`);

        var usernames = users.map(u => `jankteki-${u.innerHTML}`);

        chrome.storage.sync.get(usernames, function (storedUsers) {
            Object.keys(storedUsers).forEach(u => document.querySelector(`span[data-username=${u}]`).classList.add('known-user'));
        })
    }
});

var gameList = document.querySelector('.game-list');
observer.observe(gameList, {childList: true});

function getAllPlayers () {
    return Array.from(
        document.querySelectorAll('.player span:not(.side)')
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
