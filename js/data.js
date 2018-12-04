'use strict';

(function () {
  var ANNOUNCEMENT_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var ANNOUNCEMENT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var ANNOUNCEMENT_CHECKIN = ['12:00', '13:00', '14:00'];
  var ANNOUNCEMENT_CHECKOUT = ['12:00', '13:00', '14:00'];
  var ANNOUNCEMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ANNOUNCEMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ANNOUNCEMENT_DESCRIPTION = 'text';

  var mapSizeX = document.querySelector('.map__pins').offsetWidth;
  var mapSizeY = document.querySelector('.map__pins').offsetHeight;

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
        y: generatingRandomValue(130, 560)
      }
    };
    return announcement;
  };

  // генерация массива объявлений на сайте
  var announcementsArr = [];
  for (var i = 0; i < 8; i++) {
    announcementsArr.push(generatingAnnouncement(i, ANNOUNCEMENT_TITLE[i], ANNOUNCEMENT_TYPE, ANNOUNCEMENT_CHECKIN, ANNOUNCEMENT_CHECKOUT, ANNOUNCEMENT_FEATURES, ANNOUNCEMENT_DESCRIPTION, ANNOUNCEMENT_PHOTOS));
  }

  window.data = announcementsArr;
})();
