'use strict';

(function () {
  var map = document.querySelector('.map');
  var similarListPins = map.querySelector('.map__pins');

  // шаблон метки
  var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');

  // функция создания метки на карте
  var SIZE_PIN_X = 50;
  var SIZE_PIN_Y = 70;
  var createMapPin = function (announcement) {
    var announcementElementPin = similarMapPin.cloneNode(true);

    announcementElementPin.style.left = announcement.location.x - SIZE_PIN_X / 2 + 'px';
    announcementElementPin.style.top = announcement.location.y + SIZE_PIN_Y + 'px';
    announcementElementPin.querySelector('img').src = announcement.author.avatar;
    announcementElementPin.querySelector('img').alt = announcement.offer.title;

    return announcementElementPin;
  };

  // отрисовываем набор меток на карте
  var renderedPinsArr = []; // массив для хранения отрисованных меток

  window.renderPins = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (item, index) {
      var pin = createMapPin(item);
      pin.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.renderCard(data[index]);
      });
      renderedPinsArr.push(pin);
      fragment.appendChild(pin);
    });
    similarListPins.appendChild(fragment);
  };

})();
