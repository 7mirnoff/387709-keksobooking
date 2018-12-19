'use strict';
(function () {
  var cbHandler = null;

  var resetPinPisition = function () {
    window.util.pinMain.style.left = window.util.DEFAULT_POSITION_PIN_X + 'px';
    window.util.pinMain.style.top = window.util.DEFAULT_POSITION_PIN_Y + 'px';
  };

  var activeMapHandler = function (evt) {
    evt.preventDefault();
    cbHandler();
    window.util.pinMain.removeEventListener('mouseup', activeMapHandler);
    window.util.pinMain.removeEventListener('keydown', onPinEnterPress);
  };

  var onPinEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      evt.preventDefault();
      cbHandler();
      window.util.pinMain.removeEventListener('mouseup', activeMapHandler);
      window.util.pinMain.removeEventListener('keydown', onPinEnterPress);
    }
  };

  var activateMap = function () {
    window.util.map.classList.remove('map--faded');
  };
  var deactivateMap = function (cb) {
    window.util.map.classList.add('map--faded');
    cb();
    window.util.pinMain.addEventListener('mouseup', activeMapHandler);
    resetPinPisition();
  };
  var setHandlers = function (handler) {
    cbHandler = handler;
    window.util.pinMain.addEventListener('mouseup', activeMapHandler);
    window.util.pinMain.addEventListener('keydown', onPinEnterPress);
  };

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    setHandlers: setHandlers
  };
})();
