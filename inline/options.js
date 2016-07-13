loadOptions().then(function (options) {
    if (options && options.backgroundImage) {
        var css = `div.lobby-bg,
                   div.home-bg,
                   div.deckbuilder-bg,
                   div.cardbrowser-bg,
                   div.help-bg,
                   div.about-bg {
                       background-image: url('${options.backgroundImage}');
                   }`,
            head = document.head,
            style = document.createElement('style');

        style.innerHTML = css;
        head.appendChild(style);
    }
});
