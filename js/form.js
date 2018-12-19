'use strict';

(function () {
  var MAX_PRICE = 1000000;
  var MIN_STRING = 30;
  var MAX_STRING = 100;

  var form = document.querySelector('.ad-form');
  var filters = document.querySelector('.map__filters');
  var resetButton = form.querySelector('.ad-form__reset');

  var fieldsetsArr = form.querySelectorAll('.ad-form__element');

  var titleInput = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var selectType = document.querySelector('#type');
  var selectRooms = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');
  var selectTimein = document.querySelector('#timein');
  var selectTimeout = document.querySelector('#timeout');

  var priceRoomMap = {
    'palace': '10000',
    'house': '5000',
    'bungalo': '0',
    'flat': '1000'
  };

  var sizeRoomMap = {
    '100': ['0'],
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3']
  };

  var activateForm = function () {
    form.classList.remove('ad-form--disabled');
    window.util.changeDisabled(fieldsetsArr, false);
  };

  var deactivateForm = function () {
    form.classList.add('ad-form--disabled');
    window.util.changeDisabled(fieldsetsArr, true);
    form.reset();
    filters.reset();
  };

  var setHandlers = function (handler) {
    resetButton.addEventListener('click', handler);

    form.addEventListener('submit', function (evt) {
      window.backend.upload(new FormData(form), window.massegeForm.onLoad, window.massegeForm.onError);
      evt.preventDefault();
      handler();
    });
  };

  var setOptionsInputText = function (input, type, isRequired, minLength, maxLength) {
    input.type = type;
    input.required = isRequired;
    input.minLength = minLength;
    input.maxLength = maxLength;
  };

  var setOptionsInputNumber = function (input, type, isRequired, maxValue) {
    input.type = type;
    input.required = isRequired;
    input.max = maxValue;
  };

  var changeMinPrice = function () {

    var valueSelectedTypeOption = selectType.options[selectType.selectedIndex].value;

    priceInput.placeholder = priceRoomMap[valueSelectedTypeOption];
    priceInput.min = priceRoomMap[valueSelectedTypeOption];
  };

  selectType.addEventListener('change', function () {
    changeMinPrice();
  });

  var synchronizeRoom = function () {
    var valueSelectedRoomOption = selectRooms.options[selectRooms.selectedIndex].value;
    var availableCapacityArr = sizeRoomMap[valueSelectedRoomOption];
    var optionCapacityArr = selectCapacity.querySelectorAll('option');

    window.util.changeDisabled(optionCapacityArr, true);

    for (var m = 0; m < optionCapacityArr.length; m++) {
      for (var n = 0; n < availableCapacityArr.length; n++) {
        if (optionCapacityArr[m].value === availableCapacityArr[n]) {
          optionCapacityArr[m].disabled = false;
          optionCapacityArr[m].selected = true;
        }
      }
    }
  };

  selectRooms.addEventListener('change', function () {
    synchronizeRoom();
  });

  var synchronizeSelectValue = function (selectRead, selectWrite) {
    selectWrite.selectedIndex = selectRead.selectedIndex;
  };

  selectTimein.addEventListener('change', function () {
    synchronizeSelectValue(selectTimein, selectTimeout);
  });

  selectTimeout.addEventListener('change', function () {
    synchronizeSelectValue(selectTimeout, selectTimein);
  });

  var initializeForm = function () {
    setOptionsInputText(titleInput, 'text', true, MIN_STRING, MAX_STRING);
    setOptionsInputNumber(priceInput, 'number', true, MAX_PRICE);
    changeMinPrice();
    synchronizeRoom();
  };

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm,
    setHandlers: setHandlers,
    init: initializeForm
  };

})();
