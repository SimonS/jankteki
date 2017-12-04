loadOptions().then(function (options) {
    if (options && options.horizontalScrolling) {
        document.body.classList.add('horizontal-scrolling');
    }

    if (options && options.widenHq) {
      document.body.classList.add('widen-hq');
    }
});
