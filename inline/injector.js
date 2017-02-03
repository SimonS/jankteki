const frontEndScripts = ['lib/logs.js', 'inline/gameboard.js'];

frontEndScripts.forEach(script => {
    let s = document.createElement('script');
    s.src = chrome.extension.getURL(script);
    s.onload = function() {
        this.parentNode.removeChild(this);
    };
    (document.head || document.documentElement).appendChild(s);
});
