'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SIZE_MAIN_PIN_X = 62;
  var SIZE_MAIN_PIN_Y = 62;
  var DEFAULT_POSITION_PIN_X = 601;
  var DEFAULT_POSITION_PIN_Y = 344;
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking1';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  var isFirstMove = true;
  var currentPins = [];
  var currentCard = null;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    SIZE_MAIN_PIN_X: SIZE_MAIN_PIN_X,
    SIZE_MAIN_PIN_Y: SIZE_MAIN_PIN_Y,
    DEFAULT_POSITION_PIN_X: DEFAULT_POSITION_PIN_X,
    DEFAULT_POSITION_PIN_Y: DEFAULT_POSITION_PIN_Y,
    URL_UPLOAD: URL_UPLOAD,
    URL_LOAD: URL_LOAD,
    isFirstMove: isFirstMove,
    currentPins: currentPins,
    currentCard: currentCard
  };
})();
