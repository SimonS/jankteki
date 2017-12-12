var widenHqGlobal;

( function() {
  function resizeHq(nodeToWiden) {
    var $nodeToWiden = $(nodeToWiden);
    var cardWrappers = $nodeToWiden.find('.card-wrapper');
    var numCards = cardWrappers.length;
    var nodeWidth = numCards * 60;
    nodeWidth = Math.min(nodeWidth, 700);
    nodeWidth = Math.max(nodeWidth, 383);
    $nodeToWiden.width(nodeWidth);
    var step = nodeWidth / numCards;
    if (step > 60) {
      step = 60;
    }
    var counterWidth = 0 - step;
    cardWrappers.each(function () {
      counterWidth += step;
      $(this).css({left: counterWidth});
    });
  }

  function stop() {
    observer.disconnect();
  }

  function start(nodeToWiden) {
    var bindedResize = resizeHq.bind(null, nodeToWiden);
    observer = new MutationObserver(bindedResize);
    var config = {attributes: true, childList: true, characterData: true, subtree: true};
    observer.observe(nodeToWiden, config);
  }

  widenHqGlobal = {
    start: start,
    stop: stop,
  };

})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = WidenHq;
}