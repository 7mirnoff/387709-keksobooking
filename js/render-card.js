'use strict';

(function () {
  var map = document.querySelector('.map');
  var similarCard = document.querySelector('#card').content.querySelector('.map__card');

  var typeRoomMap = {
    'palace': 'Дворец',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'flat': 'Квартира'
  };

  // функция отрисовки карточки объявления
  var createCard = function (announcement) {
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

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  // функция удаления объявления
  var closePopup = function () {
    if (window.util.currentCard) {
      window.util.currentCard.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  // функция открытия объявления
  window.renderCard = function (index) {
    // закрываем открытое объявление
    closePopup();
    // отрисовываем карточку объявления c индексом index
    window.util.currentCard = createCard(index);
    map.insertBefore(window.util.currentCard, map.querySelector('.map__filters-container'));

    // сразу ищем кнопку закрыть и вешаем на нее событие закрытия
    var cardClose = window.util.currentCard.querySelector('.popup__close'); // кнопка закрыть
    cardClose.addEventListener('click', function () {
      closePopup();
    });

    document.addEventListener('keydown', onPopupEscPress);
  };
})();
