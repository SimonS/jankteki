// put command panel in middle panel


var observer = new MutationObserver(function () {
    if (document.querySelector('#gameboard').style.display !== "none") {
        createFixesPanel();
    }
});

var gameBoard = document.querySelector('#gameboard');
observer.observe(gameBoard, {childList: true});

// use websockets to post commands: socket = io.connect(iourl + '/lobby')
// to post chat: socket.emit("netrunner", {"action":"do","gameid":localStorage['gameid'],"command":"say","args":{"user":user,"text":"deck 3"}})

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
