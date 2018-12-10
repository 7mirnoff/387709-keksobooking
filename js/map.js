'use strict';
(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var cbHandler = null;

  function activeMapHandler(event) {
    event.preventDefault();
    cbHandler();
    pinMain.removeEventListener('mouseup', activeMapHandler);
  }

  function activateMap() {
    map.classList.remove('map--faded');
  }
  function deactivateMap(cb) {
    map.classList.add('map--faded');
    cb();
    pinMain.addEventListener('mouseup', activeMapHandler);
  }
  function setHandlers(handler) {
    cbHandler = handler;
    pinMain.addEventListener('mouseup', activeMapHandler);
  }

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    setHandlers: setHandlers
  };
})();
