'use strict';

(function () {
  var main = document.querySelector('main');
  var currentMessage;

  var closeMessage = function () {
    currentMessage.remove();
    document.removeEventListener('keydown', onMessageEscPress);
  };

  var onMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeMessage();
    }
  };

  var onLoad = function () {
    var similarLoadMassage = document.querySelector('#success').content.querySelector('.success');
    currentMessage = main.appendChild(similarLoadMassage.cloneNode(true));

    document.addEventListener('click', function () {
      closeMessage();
    });

    document.addEventListener('keydown', onMessageEscPress);
  };

  var onError = function () {
    var similarErrorMassage = document.querySelector('#error').content.querySelector('.error');
    currentMessage = main.appendChild(similarErrorMassage.cloneNode(true));

    document.addEventListener('click', function () {
      closeMessage();
    });

    document.addEventListener('keydown', onMessageEscPress);
  };

  window.massegeForm = {
    onLoad: onLoad,
    onError: onError
  };
})();
