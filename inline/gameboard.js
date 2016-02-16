var socket = io.connect(iourl + '/lobby');

var observer = new MutationObserver(function () {
    if (document.querySelector('#gameboard').style.display !== "none") {
        createFixesPanel();

        var fixesPanel = document.querySelector('#fixes-pane .panel'),
            closeBtn = document.createElement('button');

        closeBtn.innerHTML = 'Close Prompt';

        fixesPanel.appendChild(closeBtn);

        closeBtn.addEventListener('click', function () {
            socket.emit("netrunner", {
                "action": "do",
                "gameid": localStorage['gameid'],
                "command": "say",
                "args": {
                    "user": user, "text": "Close Prompt"
                }
            });
        });

        // close button: close-prompt
        //      send command /close-prompt
    }
});

var gameBoard = document.querySelector('#gameboard');
observer.observe(gameBoard, {childList: true});

function createFixesPanel() {
    if (!document.getElementById('fixes-pane')) {
        var fixes = document.createElement('div');

        fixes.id = 'fixes-pane';
        fixes.innerHTML = '<div class="panel blue-shade"><h4><span>Fixes</span></h4></div>';

        var secondaryPane = document.querySelector('.secondary-pane'),
            buttonPane = document.querySelector('.button-pane');

        secondaryPane.insertBefore(fixes, buttonPane);
    }
}
