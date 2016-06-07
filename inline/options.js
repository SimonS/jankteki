loadOptions().then(function (options) {
    if (options && options.horizontalScrolling) {
        document.body.classList.add('horizontal-scrolling');
    }
});
