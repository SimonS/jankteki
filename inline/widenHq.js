var widenHqGlobal;

( function() {
  var observer;

  function resizeHq() {
    var hq = $("[data-server='HQ']");
    var cardWrappers = hq.find('.card-wrapper');
    var numCards = cardWrappers.length;
    var hqWidth = numCards * 60;
    hqWidth = Math.min(hqWidth, 700);
    hqWidth = Math.max(hqWidth, 383);
    hq.width(hqWidth);
    var step = hqWidth / numCards;
    if (step > 60) {
      step = 60;
    }
    var counterWidth = 0 - step;
    var debugCounter = 0;
    cardWrappers.each(function () {
      counterWidth += step;
      $(this).css({left: counterWidth});
      debugCounter += 1;
    });
  }

  function stop() {
    observer.disconnect();
  }

  function start() {
    var hqNode = document.querySelector("[data-server='HQ']");
    observer = new MutationObserver(resizeHq);
    var config = {attributes: true, childList: true, characterData: true, subtree: true};
    observer.observe(hqNode, config);
  }

  widenHqGlobal = {
    start: start,
    stop: stop,
  };

})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = WidenHq;
}