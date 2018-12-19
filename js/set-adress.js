'use strict';

(function () {
  var addressPointer = document.querySelector('#address');

  window.setAdress = function () {
    var locationX;
    var locationY;
    var arrowSize = 0;
    var factorSize = 2;

    addressPointer.readOnly = true;

    if (!window.util.map.classList.contains('map--faded')) {
      arrowSize = parseInt(getComputedStyle(window.util.pinMain, ':after').height, 10);
      factorSize = 1;
    }

    locationX = window.util.pinMain.offsetLeft + window.util.SIZE_MAIN_PIN_X / 2;
    locationY = window.util.pinMain.offsetTop - window.util.SIZE_MAIN_PIN_Y / factorSize + arrowSize;
    addressPointer.value = locationX + ', ' + locationY;
  };
})();
