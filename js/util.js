'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SIZE_MAIN_PIN_X = 62;
  var SIZE_MAIN_PIN_Y = 62;
  var DEFAULT_POSITION_PIN_X = 601;
  var DEFAULT_POSITION_PIN_Y = 344;

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
    isFirstMove: isFirstMove,
    currentPins: currentPins,
    currentCard: currentCard
  };
})();
