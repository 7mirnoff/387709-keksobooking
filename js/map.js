'use strict';
(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var cbHandler = null;

  function activeMapHandler(evt) {
    evt.preventDefault();
    cbHandler();
    pinMain.removeEventListener('mouseup', activeMapHandler);
    pinMain.removeEventListener('keydown', onPinEnterPress);
  }

  var onPinEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      evt.preventDefault();
      cbHandler();
      pinMain.removeEventListener('mouseup', activeMapHandler);
      pinMain.removeEventListener('keydown', onPinEnterPress);
    }
  };

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
    pinMain.addEventListener('keydown', onPinEnterPress);
  }

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    setHandlers: setHandlers
  };
})();
