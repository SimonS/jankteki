var socket = io.connect(iourl + '/lobby');

var observer = new MutationObserver(function () {
    if (document.querySelector('#gameboard').style.display !== "none") {
        createFixesPanel();

        var fixesPanel = document.querySelector('#fixes-pane .panel'),
            closeBtn = createCloseButton();

        fixesPanel.appendChild(closeBtn);
    }
});

var gameBoard = document.querySelector('#gameboard');
observer.observe(gameBoard, {childList: true});

function createFixesPanel () {
    if (!document.getElementById('fixes-pane')) {
        var fixes = document.createElement('div');

        fixes.id = 'fixes-pane';
        fixes.innerHTML = '<div class="panel blue-shade"><h4><span>Fixes</span></h4></div>';

        var secondaryPane = document.querySelector('.secondary-pane'),
            buttonPane = document.querySelector('.button-pane');

        secondaryPane.insertBefore(fixes, buttonPane);
    }
}

function createCloseButton () {
    var button = document.createElement('button');

    button.innerHTML = 'Close Prompt';

    button.addEventListener('click', function () {
        socket.emit("netrunner", {
            "action": "do",
            "gameid": localStorage['gameid'],
            "command": "say",
            "side": getSide(),
            "args": {
                "user": user,
                "text": "/close-prompt"
            }
        });
    });

    return button;
}

function getSide () {
    return document.querySelector('.runner-board.opponent') ? 'corp' : 'runner';
}
