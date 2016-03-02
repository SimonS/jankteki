chrome.storage.sync.get(['options'], function (items) {
    var options = items.options;

    if (options.horizontalScrolling) {
        document.body.classList.add('horizontal-scrolling');
    }
});
