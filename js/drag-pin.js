'use strict';

(function () {
  var mapMainPointer = document.querySelector('.map__pin--main');
  var mapSizeX = document.querySelector('.map__pins').offsetWidth;

  var createRangeValueCords = function (cords, min, max) {
    if (cords <= min) {
      cords = min;
    } else if (cords >= max) {
      cords = max;
    }
    return cords;
  };

  mapMainPointer.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCordsX = mapMainPointer.offsetLeft - shift.x;
      var newCordsY = mapMainPointer.offsetTop - shift.y;

      newCordsX = createRangeValueCords(newCordsX, 0 - window.util.SIZE_MAIN_PIN_X / 2, mapSizeX - window.util.SIZE_MAIN_PIN_X / 2);
      newCordsY = createRangeValueCords(newCordsY, 130, 630);

      mapMainPointer.style.top = newCordsY + 'px';
      mapMainPointer.style.left = newCordsX + 'px';

      window.setAdress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.setAdress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
