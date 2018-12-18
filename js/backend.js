'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking1';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var TIME_OUT = 10000;

  var createRequest = function (type, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OUT;

    xhr.open(type, url);
    xhr.send(data);
  };

  var upload = function (data, onLoad, onError) {
    createRequest('POST', URL_UPLOAD, onLoad, onError, data);
  };

  var load = function (onLoad, onError) {
    createRequest('GET', URL_LOAD, onLoad, onError);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
