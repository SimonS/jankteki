loadOptions().then(function (options) {
    if (options && options.widenHq) {
      document.body.classList.add('widen-hq');
    }
});
