'use strict';

(function () {
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var filtersMap = document.querySelectorAll('.map__filter');
  var fieldsetsForm = document.querySelectorAll('.ad-form__element');
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
    window.changeDisabled(fieldsetsForm, true);
    window.changeDisabled(filtersMap, true);
  };

  window.triggerMap = {
    activate: activate,
    deactivate: deactivate
  };
})();
