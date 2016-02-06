var friends = [];

var observer = new MutationObserver(function() {
    if (document.querySelector('#gamelobby').style.display !== "none") {
        var oldFriends = [];

        chrome.storage.sync.get(['friends'], function (items) {
            var pinned = getOrCreatePinned();
            var friends = items.friends || [],
                onlineFriends = getAllPlayers()
                    .filter((player) => friends.indexOf(player.innerText) !== -1);

            if (JSON.stringify(onlineFriends) !== JSON.stringify(oldFriends)) {
                pinned.innerHTML = '';

                onlineFriends.forEach(function (player, i) {
                    var target = 'friend-' + i;

                    Array.from(document.querySelectorAll('#' + target))
                        .forEach((existing) => existing.id = '');

                    var gameLine = player.closest('.gameline');
                    gameLine.id = target;

                    var li = document.createElement('li');
                    li.innerHTML = '<a href="#' + target + '">' + player.innerText + '</a>';

                    pinned.appendChild(li);
                });
            }

            if (onlineFriends.length === 0) {
                pinned.innerHTML = '';
                var li = document.createElement('li');
                li.innerHTML = 'Nobody is playing.<br />◉︵◉';

                pinned.appendChild(li);
            }

            oldFriends = onlineFriends;
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
