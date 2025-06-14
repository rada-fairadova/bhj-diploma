/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
function createRequest(options = {}) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  
  const { method, url, data, callback } = options;
  
  let requestData = null;
  let requestUrl = url;
  
  if (method === 'GET' && data) {
    const params = new URLSearchParams(data).toString();
    requestUrl += `?${params}`;
  } else if (data) {
    requestData = new FormData();
    for (const key in data) {
      requestData.append(key, data[key]);
    }
  }
  
  // Обработчики событий
  xhr.onload = () => {
    callback(null, xhr.response);
  };
  
  xhr.onerror = () => {
    callback('Ошибка соединения');
  };
  
  // Отправка запроса
  try {
    xhr.open(method, requestUrl);
    xhr.send(requestData);
  } catch (e) {
    callback(e);
  }
}