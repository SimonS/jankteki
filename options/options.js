loadOptions().then(function (options) {

});

document.getElementById('options').addEventListener('submit', function (e) {
    e.preventDefault();

    var options = {};

    chrome.storage.sync.set({'options': options}, function () {
        var notificationOption = {
            type: 'basic',
            title: 'Saved',
            message: 'Your options were saved successfully',
            iconUrl: '../icons/icon128.png'
        };

        chrome.notifications.create(
            'optionsSaved', notificationOption, function () {}
        );
    });

});
