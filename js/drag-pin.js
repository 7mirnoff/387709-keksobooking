'use strict';

(function () {
  var mapMainPointer = document.querySelector('.map__pin--main');
  var mapSizeX = document.querySelector('.map__pins').offsetWidth;
  var isFirstMove = true;

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

      if (isFirstMove) {
        window.triggerMap.activate();
        window.backend.load(onLoad, onError);
        isFirstMove = false;
      }

      window.setAdress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // доступ с клавиатуры
  var onMainPinFirstEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.triggerMap.activate();
      window.setAdress();
      window.backend.load(onLoad, onError);
      isFirstMove = false;
      mapMainPointer.removeEventListener('keydown', onMainPinFirstEnterPress);
    }
  };

  mapMainPointer.addEventListener('keydown', onMainPinFirstEnterPress);

  // обработчики успешной и неуспешной загрузки объявлений
  var onLoad = function (data) {
    window.renderPins(data);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

})();
