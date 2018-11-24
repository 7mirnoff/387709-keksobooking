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
};

// функция случайного перемешивания массива по алгоритму Фишера-Йетса
function mixingArr(array){
	var j, temporary;
	for(var i = array.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temporary = array[j];
		array[j] = array[i];
		array[i] = temporary;
	}
	return array;
}
// функция обрезания массива на случайную длинну
var generatingRandomSet = function (array) {
  var quantityValues = generatingRandomValue(0, array.length);
  var randomSet = array.slice(quantityValues)
  return randomSet;
}

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

// включение активного режима карты
var mapActive = document.querySelector('.map');
mapActive.classList.remove('map--faded');

// ОТРИСОВКА МЕТОК НА КАРТЕ
// список меток на карте
var similarListPins = mapActive.querySelector('.map__pins');

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

  switch (announcement.offer.type) {
    case 'palace':
      var typeRoom = 'Дворец';
      break;
    case 'house':
      var typeRoom = 'Дом';
      break;
    case 'bungalo':
      var typeRoom = 'Бунгало';
      break;
    case 'flat':
      var typeRoom = 'Квартира';
      break;
  };

  announcementElementCard.querySelector('.popup__type').textContent = typeRoom;
  announcementElementCard.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
  announcementElementCard.querySelector('.popup__text--time').textContent = 'Заезд после' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;

  // отрисовка списка удобств
  if (announcement.offer.features.length) {
    announcementElementCard.querySelector('.popup__features').innerText = '';
    for (var i = 0; i < announcement.offer.features.length; i++) {
      var newFeaturesItem = document.createElement('li');
      newFeaturesItem.classList.add('popup__feature');
      newFeaturesItem.classList.add('popup__feature--' + announcement.offer.features[i]);
      announcementElementCard.querySelector('.popup__features').appendChild(newFeaturesItem);
    }
  } else {
    announcementElementCard.querySelector('.popup__features').remove(); // удаляем блок если данных нет
  }


  announcementElementCard.querySelector('.popup__description').textContent = announcement.offer.description;

  // вставляем изображения в описании
  if (announcement.offer.photos.length) {
    announcementElementCard.querySelector('.popup__photo').src = announcement.offer.photos[0];
    for (var i = 1; i < announcement.offer.photos.length; i++) {
      var newImg = announcementElementCard.querySelector('.popup__photo').cloneNode(true);
      newImg.src = announcement.offer.photos[i];
      announcementElementCard.querySelector('.popup__photos').appendChild(newImg);
    }
  } else {
    announcementElementCard.querySelector('.popup__photos').remove(); // удаляем блок если данных нет
  }

  // вставляем аватарку пользователя
  announcementElementCard.querySelector('.popup__avatar').src = announcement.author.avatar;

  return announcementElementCard;
};

// отрисовываем карточку объявления c индексом 0
mapActive.insertBefore(renderCardAnnouncement(announcements[0]), mapActive.querySelector('.map__filters-container'));
