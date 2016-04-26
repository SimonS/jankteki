var usernameElement = document.getElementById('jankteki-user-name');

var userId = getQueryVariable('user');

usernameElement.innerHTML = userId;

chrome.storage.sync.get(['jankteki-' + userId], function (items) {
    var notes = items.hasOwnProperty('jankteki-' + userId) ?
        items['jankteki-' + userId].notes :
        '';

    document.getElementById('jankteki-notes').value = notes;
});

document.getElementById('user').addEventListener('submit', function (e) {
    e.preventDefault();

    var user = {},
        key = 'jankteki-' + userId;

    user[key] = {
        key: key,
        name: userId,
        notes: document.getElementById('jankteki-notes').value
    };

    chrome.storage.sync.set(user, function () {
        var notificationOption = {
            type: 'basic',
            title: 'Saved',
            message: 'User ' + userId + ' was saved successfully',
            iconUrl: '../icons/icon128.png'
        };

        chrome.notifications.create(
            'userSaved', notificationOption, function () {}
        );
    });

});

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}