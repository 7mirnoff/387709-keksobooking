'use strict';

(function () {
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var filtersMap = document.querySelectorAll('.map__filter');
  var fieldsetsForm = document.querySelectorAll('.ad-form__element');
  var mapMainPointer = document.querySelector('.map__pin--main');
  // функция активации карты и формы
  var activate = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.changeDisabled(fieldsetsForm, false);
    window.changeDisabled(filtersMap, false);
  };

  // функция деактивации карты и формы
  var deactivate = function () {
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    mapMainPointer.style.left = window.util.DEFAULT_POSITION_PIN_X + 'px';
    mapMainPointer.style.top = window.util.DEFAULT_POSITION_PIN_Y + 'px';

    window.changeDisabled(fieldsetsForm, true);
    window.changeDisabled(filtersMap, true);

    if (window.util.currentCard) {
      window.util.currentCard.remove();
    }

    if (window.util.currentPins) {
      for (var i = 0; i < window.util.currentPins.length; i++) {
        window.util.currentPins[i].remove();
      }
    }
  };

  window.triggerMap = {
    activate: activate,
    deactivate: deactivate
  };
})();
