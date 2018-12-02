'use strict';

// деактивация карты и формы при загрузке DOM дерева
document.addEventListener('DOMContentLoaded', function () {
  window.triggerMap.deactivate();
  window.setAdress();
});
