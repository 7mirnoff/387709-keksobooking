'use strict';

(function () {
  var MIN_RANGE = 130;
  var MAX_RANGE = 630;
  var mapSizeX = window.util.pinsContainer.offsetWidth;

  var createRangeValueCords = function (cords, min, max) {
    if (cords <= min) {
      cords = min;
    }

    if (cords >= max) {
      cords = max;
    }
    return cords;
  };

  window.util.pinMain.addEventListener('mousedown', function (evt) {
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

      var newCordsX = window.util.pinMain.offsetLeft - shift.x;
      var newCordsY = window.util.pinMain.offsetTop - shift.y;

      newCordsX = createRangeValueCords(newCordsX, 0 - window.util.SIZE_MAIN_PIN_X / 2, mapSizeX - window.util.SIZE_MAIN_PIN_X / 2);
      newCordsY = createRangeValueCords(newCordsY, MIN_RANGE, MAX_RANGE);

      window.util.pinMain.style.top = newCordsY + 'px';
      window.util.pinMain.style.left = newCordsX + 'px';

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
