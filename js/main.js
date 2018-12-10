'use strict';
(function () {
  var loadData = new Event('loadData', {bubbles: true, cancelable: true});

  function deActivePage() {
    window.map.deactivate(window.ads.remove);
    window.adForm.deactivate();
  }
  function activePage() {
    window.map.activate();
    window.adForm.activate();
    window.ads.renderPins(window.data.get());
  }
  function loadDataHandler(event) {
    event.preventDefault();
    window.map.setHandlers(activePage);
    window.adForm.setHandlers(deActivePage);
  }

  document.addEventListener('DOMContentLoaded', function () {
    deActivePage();
    document.addEventListener('loadData', loadDataHandler);
    window.backend.load(function (response) {
      window.data.set(response);
      document.dispatchEvent(loadData);
    }, function (error) {
      console.log(error);
    });
  });
})();
