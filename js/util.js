'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SIZE_MAIN_PIN_X = 62;
  var SIZE_MAIN_PIN_Y = 62;
  var DEFAULT_POSITION_PIN_X = 601;
  var DEFAULT_POSITION_PIN_Y = 344;

  var changeDisabled = function (fieldsets, isDisabled) {
    for (var l = 0; l < fieldsets.length; l++) {
      fieldsets[l].disabled = isDisabled;
    }
  };

  var mixingArr = function (array) {
    var j;
    var temporary;
    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temporary = array[j];
      array[j] = array[i];
      array[i] = temporary;
    }
    return array;
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    SIZE_MAIN_PIN_X: SIZE_MAIN_PIN_X,
    SIZE_MAIN_PIN_Y: SIZE_MAIN_PIN_Y,
    DEFAULT_POSITION_PIN_X: DEFAULT_POSITION_PIN_X,
    DEFAULT_POSITION_PIN_Y: DEFAULT_POSITION_PIN_Y,
    changeDisabled: changeDisabled,
    mixingArr: mixingArr
  };
})();
