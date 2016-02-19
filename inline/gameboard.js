var socket = io.connect(iourl + '/lobby');

var observer = new MutationObserver(function () {
    if (document.querySelector('#gameboard').style.display !== "none") {
        createFixesPanel();

        var fixesPanel = document.querySelector('#fixes-pane .panel');

        var buttons = [
            {text: 'Draw n cards', command: 'draw', prompt: 'How many to draw?'},
            {text: 'Adjust credits', command: 'credit', prompt: 'How many credits?'},
            {text: 'Adjust clicks', command: 'click', prompt: 'How many clicks?'},
            {text: 'Adjust memory', command: 'memory', prompt: 'How much memory?', side: 'runner'},
            {text: 'Adjust tags', command: 'tag', prompt: 'How many tags?', side: 'runner'},
            {text: 'Adjust bad publicity', command: 'bp', prompt: 'How much bad publicity?', side: 'corp'},
            {text: 'Adjust link', command: 'link', prompt: 'How much link?', side: 'runner'},
            {text: 'Adjust hand size', command: 'handsize', prompt: 'What is your handsize?'},
            {text: 'Take meat damage', command: 'take-meat', prompt: 'How much meat damage?', side: 'runner'},
            {text: 'Take net damage', command: 'take-net', prompt: 'How much net damage?', side: 'runner'},
            {text: 'Take brain damage', command: 'take-brain', prompt: 'How much brain damage?', side: 'runner'},
            {text: 'Discard card', command: 'discard', prompt: 'Which card?', which: true},
            {text: 'Put card on deck', command: 'deck', prompt: 'Which card?', which: true},
            {text: 'Initiate trace', command: 'trace', prompt: 'Base strength?', side: 'corp'},
            {text: 'Close active prompt', command: 'close-prompt'},
            {text: 'Start a Psi game', command: 'psi', 'side': 'corp'},
            {text: 'End a run', command: 'end-run', 'side': 'corp'},
            {text: 'Jack out', command: 'jack-out', 'side': 'runner'},
            {text: 'Set card counters', command: 'counter', 'prompt': 'How many counters?'},
            {text: 'Advance card', command: 'adv-counter', 'prompt': 'How many counters?', side: 'corp'},
            {text: 'Debug card', command: 'card-info'}
        ];

        buttons.forEach((btn) => fixesPanel.appendChild(
            createFixButton(btn)
        ));
    }
});

var gameBoard = document.querySelector('#gameboard');
observer.observe(gameBoard, {childList: true});

function createFixesPanel () {
    if (!document.getElementById('fixes-pane')) {
        var fixes = document.createElement('div');

        fixes.className = getSide();
        fixes.id = 'fixes-pane';
        fixes.innerHTML = '<div class="panel blue-shade"><h4><span>Fixes</span></h4></div>';

        var secondaryPane = document.querySelector('.secondary-pane'),
            buttonPane = document.querySelector('.button-pane');

        var buttonWrap = document.createElement('div');
        buttonWrap.id = 'button-wrap';

        buttonWrap.appendChild(fixes);

        buttonWrap.insertBefore(buttonPane, fixes);

        secondaryPane.appendChild(buttonWrap);

        var expander = document.querySelector('#fixes-pane h4');
        var panel = document.querySelector('#fixes-pane .panel');

        expander.addEventListener('click',
            () => panel.classList.toggle('expanded'));
    }
}

function createFixButton (btn) {
    var button = document.createElement('button');

    button.innerHTML = btn.text;
    button.className = 'side' in btn ? btn.side : '';

    button.addEventListener('click', function () {
        var n = btn.prompt ? prompt(btn.prompt) : '';
        n = btn.which ? ' #' + n : ' ' + n;

        socket.emit("netrunner", {
            "action": "do",
            "gameid": localStorage['gameid'],
            "command": "say",
            "side": getSide(),
            "args": {
                "user": user,
                "text": "/" + btn.command + n
            }
        });
    });

    return button;
}

function getSide () {
    return document.querySelector('.runner-board.opponent') ? 'corp' : 'runner';
}
