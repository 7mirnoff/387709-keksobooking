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
var SIZE_MAIN_PIN_X = 65;
var SIZE_MAIN_PIN_Y = 65;

var setAdress = function () {
  var locationX; // координата X
  var locationY; // координата Y
  var arrowSize = 0; // размер стрелки маркера по умолчанию
  var factorSize = 2; // коэфициент деления высоты пина для поиска центра

  addressPointer.readOnly = true; // устанавливаем поле только для чтения

  if (!map.classList.contains('map--faded')) { // если карта активна, то при размере учитывать стрелку
    arrowSize = parseInt(getComputedStyle(mapMainPointer, ':after').height, 10);
    factorSize = 1;
  }

  locationX = mapMainPointer.offsetLeft + SIZE_MAIN_PIN_X / 2;
  locationY = mapMainPointer.offsetTop + SIZE_MAIN_PIN_Y / factorSize + arrowSize;
  addressPointer.value = locationX + ', ' + locationY;
};

var onMainPinFirstClick = function () {
  activateMap();
  setAdress();
  mapMainPointer.removeEventListener('mouseup', onMainPinFirstClick);
};

var onMainPinFirstEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
    setAdress();
    mapMainPointer.removeEventListener('keydown', onMainPinFirstEnterPress);
  }
};
// активация карты и формы при нажатии на кнопку
mapMainPointer.addEventListener('mouseup', onMainPinFirstClick);
mapMainPointer.addEventListener('keydown', onMainPinFirstEnterPress);

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
var SIZE_PIN_X = 50;
var SIZE_PIN_Y = 70;
var createMapPin = function (announcement) {
  var announcementElementPin = similarMapPin.cloneNode(true);

  announcementElementPin.style.left = announcement.location.x - SIZE_PIN_X / 2 + 'px';
  announcementElementPin.style.top = announcement.location.y - SIZE_PIN_Y + 'px';
  announcementElementPin.querySelector('img').src = announcement.author.avatar;
  announcementElementPin.querySelector('img').alt = announcement.offer.title;

  return announcementElementPin;
};

// отрисовываем набор меток на карте
var renderedPinsArr = []; // массив для хранения отрисованных меток

function renderPins(data) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (item, index) {
    var pin = createMapPin(item);
    pin.addEventListener('click', function (evt) {
      evt.preventDefault();
      openPopup(index);
    });
    renderedPinsArr.push(pin);
    fragment.appendChild(pin);
  });
  similarListPins.appendChild(fragment);
}

renderPins(announcements);

// ОТРИСОВКА ОБЪЯВЛЕНИЯ
// шаблон карточки объявления
var similarCard = document.querySelector('#card').content.querySelector('.map__card');

var typeRoomMap = {
  'palace': 'Дворец',
  'house': 'Дом',
  'bungalo': 'Бунгало',
  'flat': 'Квартира'
};

// функция отрисовки карточки объявления
var createCardAnnouncement = function (announcement) {
  var announcementElementCard = similarCard.cloneNode(true);

  announcementElementCard.querySelector('.popup__title').textContent = announcement.offer.title;
  announcementElementCard.querySelector('.popup__text--address').textContent = announcement.offer.address;
  announcementElementCard.querySelector('.popup__text--price').textContent = announcement.offer.price + '₽/ночь';

  announcementElementCard.querySelector('.popup__type').textContent = typeRoomMap[announcement.offer.type];
  announcementElementCard.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
  announcementElementCard.querySelector('.popup__text--time').textContent = 'Заезд после' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;

  // отрисовка списка удобств
  var featuresBox = announcementElementCard.querySelector('.popup__features');
  if (announcement.offer.features.length) {
    featuresBox.innerHTML = '';
    announcement.offer.features.forEach(function (item) {
      var newFeaturesItem = document.createElement('li');
      newFeaturesItem.classList.add('popup__feature');
      newFeaturesItem.classList.add('popup__feature--' + item);
      featuresBox.appendChild(newFeaturesItem);
    });
  } else {
    featuresBox.remove(); // удаляем блок если данных нет
  }

  announcementElementCard.querySelector('.popup__description').textContent = announcement.offer.description;

  // вставляем изображения в описании
  var photoBox = announcementElementCard.querySelector('.popup__photos');
  if (announcement.offer.photos.length) {
    var clonePhoto = announcementElementCard.querySelector('.popup__photo').cloneNode(true);
    photoBox.innerHTML = '';
    announcement.offer.photos.forEach(function (item) {
      var newPhoto = clonePhoto.cloneNode(true);
      newPhoto.src = item;
      photoBox.appendChild(newPhoto);
    });
  } else {
    photoBox.remove(); // удаляем блок если данных нет
  }

  // вставляем аватарку пользователя
  announcementElementCard.querySelector('.popup__avatar').src = announcement.author.avatar;

  return announcementElementCard;
};

// НАЧАЛО ** ОТКРЫТИЕ И ЗАКРЫТИЕ ОБЪЯВЛЕНИЙ
var ESC_KEYCODE = 27;

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// функция удаления объявления
var closePopup = function () {
  if (currentCard) {
    currentCard.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  }
};

// функция открытия объявления
var currentCard = null;
var openPopup = function (index) {
  // закрываем открытое объявление
  closePopup();
  // отрисовываем карточку объявления c индексом index
  currentCard = createCardAnnouncement(announcements[index]);
  map.insertBefore(currentCard, map.querySelector('.map__filters-container'));

  // сразу ищем кнопку закрыть и вешаем на нее событие закрытия
  var cardClose = currentCard.querySelector('.popup__close'); // кнопка закрыть
  cardClose.addEventListener('click', function () {
    closePopup();
  });

  document.addEventListener('keydown', onPopupEscPress);
};

// КОНЕЦ ** ОТКРЫТИЕ И ЗАКРЫТИЕ ОБЪЯВЛЕНИЙ
