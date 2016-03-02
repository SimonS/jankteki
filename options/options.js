chrome.storage.sync.get(['options'], function (items) {
    var options = items.options;

    if (options.horizontalScrolling) {
        document.getElementById('horizontal-scrolling')['checked'] = 'checked';
    }
});

document.getElementById('options').addEventListener('submit', function (e) {
    e.preventDefault();

    var options = {};
    options.horizontalScrolling = document.getElementById('horizontal-scrolling').checked;

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
