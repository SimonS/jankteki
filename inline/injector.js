var s = document.createElement('script');
s.src = chrome.extension.getURL('inline/gameboard.js');

var widenScript = document.createElement('script');
widenScript.src = chrome.extension.getURL('inline/widenHq.js');

s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);
(document.head || document.documentElement).appendChild(widenScript);
