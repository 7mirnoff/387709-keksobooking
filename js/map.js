// Файл setup.js
'use strict';

var ANNOUNCEMENT_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ANNOUNCEMENT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ANNOUNCEMENT_CHECKIN = ['12:00', '13:00', '14:00'];
var ANNOUNCEMENT_CHECKOUT = ['12:00', '13:00', '14:00'];
var ANNOUNCEMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ANNOUNCEMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ANNOUNCEMENT_DESCRIPTION = 'text';

// функция генерации случайного числа от MIN до MAX
function generatingRandomValue(min, max) {
  var randomValue = min + Math.random() * (max + 1 - min);
  randomValue = Math.floor(randomValue);
  return randomValue;
}

// функция случайного перемешивания массива по алгоритму Фишера-Йетса
function mixingArr(array) {
  var j;
  var temporary;
  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temporary = array[j];
    array[j] = array[i];
    array[i] = temporary;
  }
  return array;
}

// функция обрезания массива на случайную длинну
var generatingRandomSet = function (array) {
  var quantityValues = generatingRandomValue(0, array.length);
  var randomSet = array.slice(quantityValues);
  return randomSet;
};

// Размеры карты
var mapSizeX = document.querySelector('.map__pins').offsetWidth;
var mapSizeY = document.querySelector('.map__pins').offsetHeight;

// функция генерации свойств объекта объявления
var generatingAnnouncement = function (avatar, title, type, checkin, checkout, features, description, photos) {
  var announcement = {
    author: {
      avatar: 'img/avatars/user0' + (avatar + 1) + '.png'
    },
    offer: {
      title: title,
      address: generatingRandomValue(0, mapSizeX) + ', ' + generatingRandomValue(0, mapSizeY),
      price: generatingRandomValue(1000, 1000000),
      type: type[generatingRandomValue(0, type.length - 1)],
      rooms: generatingRandomValue(1, 5),
      guests: generatingRandomValue(0, 3),
      checkin: checkin[generatingRandomValue(0, checkin.length - 1)],
      checkout: checkout[generatingRandomValue(0, checkout.length - 1)],
      features: generatingRandomSet(features),
      description: description,
      photos: mixingArr(photos)
    },
    location: {
      x: generatingRandomValue(0, mapSizeX),
      y: generatingRandomValue(130, 630)
    }
  };
  return announcement;
};

// генерация массива объявлений на сайте
var announcements = [];
for (var i = 0; i < 8; i++) {
  announcements.push(generatingAnnouncement(i, ANNOUNCEMENT_TITLE[i], ANNOUNCEMENT_TYPE, ANNOUNCEMENT_CHECKIN, ANNOUNCEMENT_CHECKOUT, ANNOUNCEMENT_FEATURES, ANNOUNCEMENT_DESCRIPTION, ANNOUNCEMENT_PHOTOS));
}

// НАЧАЛО ** АКТИВАЦИЯ И ДЕАКТИВАЦИЯ КАРТЫ И ФОРМЫ
var ENTER_KEYCODE = 13;

var map = document.querySelector('.map');
var filtersMap = document.querySelectorAll('.map__filter');
var form = document.querySelector('.ad-form');
var fieldsetsForm = document.querySelectorAll('.ad-form__element');
var mapMainPointer = document.querySelector('.map__pin--main');
var addressPointer = document.querySelector('#address');

// функция изменения disabled у полей форм
var changeDisabled = function (fieldsets, isDisabled) {
  for (var l = 0; l < fieldsets.length; l++) {
    fieldsets[l].disabled = isDisabled;
  }
};

// функция активации карты и формы
var activateMap = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  changeDisabled(fieldsetsForm, false);
  changeDisabled(filtersMap, false);
};

// функция деактивации карты и формы
var deactivateMap = function () {
  map.classList.add('map--faded');
  form.classList.add('ad-form--disabled');
  changeDisabled(fieldsetsForm, true);
  changeDisabled(filtersMap, true);
};

// функция передачи координат метки в поле адреса
var SIZE_PIN_X = 65;
var SIZE_PIN_Y = 65;

var setAdress = function () {
  var locationX; // координата X
  var locationY; // координата Y
  var arrowSize = 0; // размер стрелки маркера по умолчанию

  addressPointer.readOnly = true; // устанавливаем поле только для чтения

  if (!map.classList.contains('map--faded')) { // если карта активна, то при размере учитывать стрелку
    arrowSize = parseInt(getComputedStyle(mapMainPointer, ':after').height, 10);
  }

  locationX = mapMainPointer.offsetLeft + SIZE_PIN_X / 2;
  locationY = mapMainPointer.offsetTop + SIZE_PIN_Y + arrowSize;
  addressPointer.value = locationX + ', ' + locationY;
};

// активация карты и формы при нажатии на кнопку
mapMainPointer.addEventListener('mouseup', function () {
  activateMap();
  setAdress();
});

mapMainPointer.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
    setAdress();
  }
});

// деактивация карты и формы при загрузке DOM дерева
document.addEventListener('DOMContentLoaded', function () {
  deactivateMap();
  setAdress();
});
// КОНЕЦ ** АКТИВАЦИЯ И ДЕАКТИВАЦИЯ КАРТЫ И ФОРМЫ

// ОТРИСОВКА МЕТОК НА КАРТЕ
// список меток на карте
var similarListPins = map.querySelector('.map__pins');

// шаблон метки
var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');

// функция отрисовки метки на карте
var renderMapPin = function (announcement) {
  var announcementElementPin = similarMapPin.cloneNode(true);

  announcementElementPin.style.left = announcement.location.x - 25 + 'px';
  announcementElementPin.style.top = announcement.location.y - 70 + 'px';
  announcementElementPin.querySelector('img').src = announcement.author.avatar;
  announcementElementPin.querySelector('img').alt = announcement.offer.title;

  return announcementElementPin;
};

// отрисовываем набор меток на карте
var fragment = document.createDocumentFragment();

for (var j = 0; j < announcements.length; j++) {
  fragment.appendChild(renderMapPin(announcements[j]));
}
similarListPins.appendChild(fragment);

// ОТРИСОВКА ОБЪЯВЛЕНИЯ
// шаблон карточки объявления
var similarCard = document.querySelector('#card').content.querySelector('.map__card');

// функция отрисовки карточки объявления
var renderCardAnnouncement = function (announcement) {
  var announcementElementCard = similarCard.cloneNode(true);

  announcementElementCard.querySelector('.popup__title').textContent = announcement.offer.title;
  announcementElementCard.querySelector('.popup__text--address').textContent = announcement.offer.address;
  announcementElementCard.querySelector('.popup__text--price').textContent = announcement.offer.price + '₽/ночь';

  var typeRoom;
  switch (announcement.offer.type) {
    case 'palace':
      typeRoom = 'Дворец';
      break;
    case 'house':
      typeRoom = 'Дом';
      break;
    case 'bungalo':
      typeRoom = 'Бунгало';
      break;
    case 'flat':
      typeRoom = 'Квартира';
      break;
  }

  announcementElementCard.querySelector('.popup__type').textContent = typeRoom;
  announcementElementCard.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
  announcementElementCard.querySelector('.popup__text--time').textContent = 'Заезд после' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;

  // отрисовка списка удобств
  if (announcement.offer.features.length) {
    announcementElementCard.querySelector('.popup__features').innerText = '';
    for (var k = 0; k < announcement.offer.features.length; k++) {
      var newFeaturesItem = document.createElement('li');
      newFeaturesItem.classList.add('popup__feature');
      newFeaturesItem.classList.add('popup__feature--' + announcement.offer.features[k]);
      announcementElementCard.querySelector('.popup__features').appendChild(newFeaturesItem);
    }
  } else {
    announcementElementCard.querySelector('.popup__features').remove(); // удаляем блок если данных нет
  }

  announcementElementCard.querySelector('.popup__description').textContent = announcement.offer.description;

  // вставляем изображения в описании
  if (announcement.offer.photos.length) {
    announcementElementCard.querySelector('.popup__photo').src = announcement.offer.photos[0];
    for (var n = 1; n < announcement.offer.photos.length; n++) {
      var newImg = announcementElementCard.querySelector('.popup__photo').cloneNode(true);
      newImg.src = announcement.offer.photos[n];
      announcementElementCard.querySelector('.popup__photos').appendChild(newImg);
    }
  } else {
    announcementElementCard.querySelector('.popup__photos').remove(); // удаляем блок если данных нет
  }

  // вставляем аватарку пользователя
  announcementElementCard.querySelector('.popup__avatar').src = announcement.author.avatar;

  return announcementElementCard;
};

// НАЧАЛО ** ОТКРЫТИЕ И ЗАКРЫТИЕ ОБЪЯВЛЕНИЙ
var ESC_KEYCODE = 27;

var pins = document.querySelectorAll('.map__pins [type="button"]');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// функция поиска открытого объявления
var findPopup = function () {
  return document.querySelector('.popup');
};

// функция поиска кнопки закрыть открытого объявления
var findPopupClose = function () {
  return document.querySelector('.popup__close');
};

// функция удаления объявления
var closePopup = function () {
  var shownCard = findPopup();
  if (shownCard) {
    shownCard.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  }
};

// функция открытия объявления
var openPopup = function (index) {
  // закрываем открытое объявление
  closePopup();
  // отрисовываем карточку объявления c индексом index
  map.insertBefore(renderCardAnnouncement(announcements[index]), map.querySelector('.map__filters-container'));

  // сразу ищем кнопку закрыть и вешаем на нее событие закрытия
  var cardClose = findPopupClose();
  cardClose.addEventListener('click', function () {
    closePopup();
  });

  document.addEventListener('keydown', onPopupEscPress);
};

// вешаем обработчики событий на объявления на карте
for (var m = 0; m < pins.length; m++) {
  pins[m].addEventListener('click', (function (el) {
    return function () {
      openPopup(el);
      return false;
    };
  })(m));
  pins[m].addEventListener('keydown', (function (el) {
    return function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openPopup(el);
      }
      return false;
    };
  })(m));
}

// КОНЕЦ ** ОТКРЫТИЕ И ЗАКРЫТИЕ ОБЪЯВЛЕНИЙ
