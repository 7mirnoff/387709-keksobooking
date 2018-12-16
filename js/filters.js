'use strict';
(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var DEBOUNCE_INTERVAL = 600;
  var debounceTimer = null;

  var filterHousingType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterGuests = document.querySelector('#housing-guests');
  var filterFeatures = document.querySelector('#housing-features');
  var filterFeaturesList = filterFeatures.querySelectorAll('input');

  filterHousingType.addEventListener('change', filterData);
  filterRooms.addEventListener('change', filterData);
  filterPrice.addEventListener('change', filterData);
  filterFeatures.addEventListener('change', filterData);
  filterGuests.addEventListener('change', filterData);

  function filterData() {

    var filter = function () {
      var featuresList = [];
      for (var i = 0; i < filterFeaturesList.length; i++) {
        if (filterFeaturesList[i].checked) {
          featuresList.push(filterFeaturesList[i].value);
        }
      }

      var filteredArr = window.data.get().filter(function (evt) {
        return evt.offer.type === filterHousingType.value || filterHousingType.value === 'any';
      }).filter(function (evt) {
        var price = evt.offer.price;
        var status = false;

        if (filterPrice.value === 'any') {
          status = true;
        } else if (filterPrice.value === 'low' && price < LOW_PRICE) {
          status = true;
        } else if (filterPrice.value === 'middle' && (price >= LOW_PRICE && price <= HIGH_PRICE)) {
          status = true;
        } else if (filterPrice.value === 'high' && price > HIGH_PRICE) {
          status = true;
        }

        return status;
      }).filter(function (evt) {
        return evt.offer.rooms === +filterRooms.value || filterRooms.value === 'any';
      }).filter(function (evt) {
        return evt.offer.guests === +filterGuests.value || filterGuests.value === 'any';
      }).filter(function (evt) {
        return featuresList.every(function (ell) {
          return evt.offer.features.indexOf(ell) !== -1;
        });
      });

      window.ads.remove();
      window.ads.renderPins(filteredArr);
    };

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(filter, DEBOUNCE_INTERVAL);
  }
})();
