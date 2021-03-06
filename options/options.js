loadOptions().then(function (options) {
    if (options && options.horizontalScrolling) {
        document.getElementById('horizontal-scrolling')['checked'] = 'checked';
    }

    if (options && options.widenHq) {
        document.getElementById('widen-hq')['checked'] = 'checked';
    }
});

document.getElementById('options').addEventListener('submit', function (e) {
    e.preventDefault();

    var options = {};
    options.horizontalScrolling = document.getElementById('horizontal-scrolling').checked;
    options.widenHq = document.getElementById('widen-hq').checked;

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
