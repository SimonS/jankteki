loadOptions().then(function (options) {
    if (options && options.backgroundImage) {
        document.getElementById('background').value = options.backgroundImage;
    }
});

document.getElementById('options').addEventListener('submit', function (e) {
    e.preventDefault();

    var options = {};

    var bg = document.getElementById('background').value.trim();
    if (bg !== '') {
        options.backgroundImage = bg;
    }

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
