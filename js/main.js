'use strict';
(function () {
  var loadData = new Event('loadData', {bubbles: true, cancelable: true});

  var deActivePage = function () {
    window.map.deactivate(window.ads.remove);
    window.form.deactivate();
    window.form.init();
    window.setAdress();
  };

  var activePage = function () {
    window.map.activate();
    window.form.activate();
    window.setAdress();
    window.ads.renderPins(window.data.get());
  };

  var loadDataHandler = function (event) {
    event.preventDefault();
    window.map.setHandlers(activePage);
    window.form.setHandlers(deActivePage);
  };

  document.addEventListener('DOMContentLoaded', function () {
    deActivePage();
    document.addEventListener('loadData', loadDataHandler);
    window.backend.load(function (response) {
      window.data.set(response);
      document.dispatchEvent(loadData);
    }, function (error) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.textContent = error;
      document.body.insertAdjacentElement('afterbegin', node);
    });
  });
})();
