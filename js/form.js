'use strict';

(function () {
  // функция настройки текстового поля ввода
  var settingInputText = function (input, type, isRequired, minLength, maxLength) {
    input.type = type;
    input.required = isRequired;
    input.minLength = minLength;
    input.maxLength = maxLength;
  };

  var titleInput = document.querySelector('#title');

  settingInputText(titleInput, 'text', true, 30, 100);

  // функция настройки числового поля ввода
  var settingInputNumber = function (input, type, isRequired, maxValue) {
    input.type = type;
    input.required = isRequired;
    input.max = maxValue;
  };

  var priceInput = document.querySelector('#price');

  settingInputNumber(priceInput, 'number', true, 1000000);

  // функция настройки минимальной цены в зависимости от типа жилья
  var selectType = document.querySelector('#type');

  var priceRoomMap = {
    'palace': '10000',
    'house': '5000',
    'bungalo': '0',
    'flat': '1000'
  };

  var changeMinPrice = function () {

    var valueSelectedTypeOption = selectType.options[selectType.selectedIndex].value;

    priceInput.placeholder = priceRoomMap[valueSelectedTypeOption];
    priceInput.min = priceRoomMap[valueSelectedTypeOption];
  };

  changeMinPrice();

  selectType.addEventListener('change', function () {
    changeMinPrice();
  });


  // синхронизаця количества комнат и количества гостей
  var selectRooms = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');

  var sizeRoomMap = {
    '100': ['0'],
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3']
  };

  var synchronizationRoom = function () {
    var valueSelectedRoomOption = selectRooms.options[selectRooms.selectedIndex].value;
    var availableCapacityArr = sizeRoomMap[valueSelectedRoomOption];
    var optionCapacityArr = selectCapacity.querySelectorAll('option');

    window.changeDisabled(optionCapacityArr, true);

    for (var m = 0; m < optionCapacityArr.length; m++) {
      for (var n = 0; n < availableCapacityArr.length; n++) {
        if (optionCapacityArr[m].value === availableCapacityArr[n]) {
          optionCapacityArr[m].disabled = false;
          optionCapacityArr[m].selected = true;
        }
      }
    }
  };

  synchronizationRoom();

  selectRooms.addEventListener('change', function () {
    synchronizationRoom();
  });

  // синхронизация времени заезда и выезда
  var selectTimein = document.querySelector('#timein');
  var selectTimeout = document.querySelector('#timeout');

  var synchronizationSelectValue = function (selectRead, selectWrite) {
    selectWrite.selectedIndex = selectRead.selectedIndex;
  };

  selectTimein.addEventListener('change', function () {
    synchronizationSelectValue(selectTimein, selectTimeout);
  });

  selectTimeout.addEventListener('change', function () {
    synchronizationSelectValue(selectTimeout, selectTimein);
  });

  var form = document.querySelector('.ad-form');

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), window.massegeForm.onLoad, window.massegeForm.onError);
    evt.preventDefault();
  });

  var resetButton = document.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', function (evtReset) {
    evtReset.preventDefault();
    form.reset();

    window.triggerMap.deactivate();
    window.setAdress();

    synchronizationRoom();
    changeMinPrice();

    window.util.isFirstMove = true;
  });
})();
