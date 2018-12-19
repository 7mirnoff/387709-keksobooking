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

  var onFilterChange = function () {

    var filterPins = function () {
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

        if (filterPrice.value === 'any') {
          return true;
        } else if (filterPrice.value === 'low' && price < LOW_PRICE) {
          return true;
        } else if (filterPrice.value === 'middle' && (price >= LOW_PRICE && price <= HIGH_PRICE)) {
          return true;
        } else if (filterPrice.value === 'high' && price > HIGH_PRICE) {
          return true;
        }

        return false;
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

    debounceTimer = setTimeout(filterPins, DEBOUNCE_INTERVAL);
  };

  filterHousingType.addEventListener('change', onFilterChange);
  filterRooms.addEventListener('change', onFilterChange);
  filterPrice.addEventListener('change', onFilterChange);
  filterFeatures.addEventListener('change', onFilterChange);
  filterGuests.addEventListener('change', onFilterChange);

})();
