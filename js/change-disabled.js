'use strict';

(function () {
  // функция изменения disabled у полей форм
  window.changeDisabled = function (fieldsets, isDisabled) {
    for (var l = 0; l < fieldsets.length; l++) {
      fieldsets[l].disabled = isDisabled;
    }
  };
})();
