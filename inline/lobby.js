var friends = [];

var observer = new MutationObserver(function() {
    if (document.querySelector('#gamelobby').style.display !== "none") {
        chrome.storage.sync.get(['friends'], function (items) {
            var pinned = getOrCreatePinned();
            var friends = items.friends || [];
			var lowercaseFriends = friends.map((friend) => friend.toLowerCase());
            var onlineFriends = getAllPlayers()
                    .filter((player) =>
                        lowercaseFriends.indexOf(player.innerText.toLowerCase()) !== -1);

            pinned.innerHTML = '';
            Array.from(document.querySelectorAll('.gameline'))
                .forEach((game) => game.id = '');

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
