'use strict';
(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var cbHandler = null;

  var resetPinPisition = function () {
    pinMain.style.left = window.util.DEFAULT_POSITION_PIN_X + 'px';
    pinMain.style.top = window.util.DEFAULT_POSITION_PIN_Y + 'px';
  };

  var activeMapHandler = function (evt) {
    evt.preventDefault();
    cbHandler();
    pinMain.removeEventListener('mouseup', activeMapHandler);
    pinMain.removeEventListener('keydown', onPinEnterPress);
  };

  var onPinEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      evt.preventDefault();
      cbHandler();
      pinMain.removeEventListener('mouseup', activeMapHandler);
      pinMain.removeEventListener('keydown', onPinEnterPress);
    }
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
  };
  var deactivateMap = function (cb) {
    map.classList.add('map--faded');
    cb();
    pinMain.addEventListener('mouseup', activeMapHandler);
    resetPinPisition();
  };
  var setHandlers = function (handler) {
    cbHandler = handler;
    pinMain.addEventListener('mouseup', activeMapHandler);
    pinMain.addEventListener('keydown', onPinEnterPress);
  };

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    setHandlers: setHandlers
  };
})();
