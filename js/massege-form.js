'use strict';

(function () {
  var main = document.querySelector('main');

  var closeMessage = function (message) {
    message.remove();
  };

  var onLoad = function () {
    var similarLoadMassage = document.querySelector('#success').content.querySelector('.success');
    var currentMessage = main.appendChild(similarLoadMassage.cloneNode(true));

    currentMessage.addEventListener('click', function () {
      closeMessage(currentMessage);
    });
  };

  var onError = function () {
    var similarErrorMassage = document.querySelector('#error').content.querySelector('.error');
    var currentMessage = main.appendChild(similarErrorMassage.cloneNode(true));

    currentMessage.addEventListener('click', function () {
      closeMessage(currentMessage);
    });
  };

  window.massegeForm = {
    onLoad: onLoad,
    onError: onError
  };
})();
