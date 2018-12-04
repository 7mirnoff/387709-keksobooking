'use strict';

(function () {
  var addressPointer = document.querySelector('#address');
  var mapMainPointer = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  window.setAdress = function () {
    var locationX; // координата X
    var locationY; // координата Y
    var arrowSize = 0; // размер стрелки маркера по умолчанию
    var factorSize = 2; // коэфициент деления высоты пина для поиска центра

    addressPointer.readOnly = true; // устанавливаем поле только для чтения

    if (!map.classList.contains('map--faded')) { // если карта активна, то при размере учитывать стрелку
      arrowSize = parseInt(getComputedStyle(mapMainPointer, ':after').height, 10);
      factorSize = 1;
    }

    locationX = mapMainPointer.offsetLeft + window.util.SIZE_MAIN_PIN_X / 2;
    locationY = mapMainPointer.offsetTop - window.util.SIZE_MAIN_PIN_Y / factorSize + arrowSize;
    addressPointer.value = locationX + ', ' + locationY;
  };
})();
