'use strict';
(function () {
  var SIZE_PIN_X = 50;
  var SIZE_PIN_Y = 70;

  var renderedPins = [];
  var currentCard = null;
  var map = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var typeRoomMap = {
    'palace': 'Дворец',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'flat': 'Квартира'
  };

  var createCard = function (data) {
    var template = cardTemplate.cloneNode(true);

    template.querySelector('.popup__title').textContent = data.offer.title;
    template.querySelector('.popup__text--address').textContent = data.offer.address;
    template.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';

    template.querySelector('.popup__type').textContent = typeRoomMap[data.offer.type];
    template.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    template.querySelector('.popup__text--time').textContent = 'Заезд после' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    var featuresBox = template.querySelector('.popup__features');
    if (data.offer.features.length) {
      featuresBox.innerHTML = '';
      data.offer.features.forEach(function (item) {
        var newFeaturesItem = document.createElement('li');
        newFeaturesItem.classList.add('popup__feature');
        newFeaturesItem.classList.add('popup__feature--' + item);
        featuresBox.appendChild(newFeaturesItem);
      });
    } else {
      featuresBox.remove();
    }

    template.querySelector('.popup__description').textContent = data.offer.description;

    var photoBox = template.querySelector('.popup__photos');
    if (data.offer.photos.length) {
      var clonePhoto = template.querySelector('.popup__photo').cloneNode(true);
      photoBox.innerHTML = '';
      data.offer.photos.forEach(function (item) {
        var newPhoto = clonePhoto.cloneNode(true);
        newPhoto.src = item;
        photoBox.appendChild(newPhoto);
      });
    } else {
      photoBox.remove();
    }

    template.querySelector('.popup__avatar').src = data.author.avatar;

    return template;
  };

  var renderCard = function (index) {
    closeCard();
    currentCard = createCard(index);
    map.insertBefore(currentCard, map.querySelector('.map__filters-container'));
    var cardClose = currentCard.querySelector('.popup__close');
    cardClose.addEventListener('click', function () {
      closeCard();
    });

    document.addEventListener('keydown', onCardEscPress);
  };

  var closeCard = function () {
    if (currentCard) {
      currentCard.remove();
      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeCard();
    }
  };

  function createPin(data) {
    var template = pinTemplate.cloneNode(true);

    template.style.left = data.location.x - SIZE_PIN_X / 2 + 'px';
    template.style.top = data.location.y + SIZE_PIN_Y + 'px';
    template.querySelector('img').src = data.author.avatar;
    template.querySelector('img').alt = data.offer.title;

    return template;
  }

  function renderPins(data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      var pin = createPin(item);
      pin.addEventListener('click', function (evt) {
        evt.preventDefault();
        renderCard(item);
      });
      renderedPins.push(pin);
      fragment.appendChild(pin);
    });
    pinsContainer.appendChild(fragment);
  }

  window.ads = {
    renderPins: renderPins,
    remove: function () {
      if (renderedPins.length) {
        renderedPins.forEach(function (item) {
          item.remove();
        });
        renderedPins = [];
      }
      if (currentCard) {
        currentCard.remove();
      }
    }
  };
})();
