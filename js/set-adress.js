'use strict';

(function () {
  var addressPointer = document.querySelector('#address');
  var mapMainPointer = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  window.setAdress = function () {
    var locationX;
    var locationY;
    var arrowSize = 0;
    var factorSize = 2;

    addressPointer.readOnly = true;

    if (!map.classList.contains('map--faded')) {
      arrowSize = parseInt(getComputedStyle(mapMainPointer, ':after').height, 10);
      factorSize = 1;
    }

    locationX = mapMainPointer.offsetLeft + window.util.SIZE_MAIN_PIN_X / 2;
    locationY = mapMainPointer.offsetTop - window.util.SIZE_MAIN_PIN_Y / factorSize + arrowSize;
    addressPointer.value = locationX + ', ' + locationY;
  };
})();
