/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

};

function createRequest(options = {}) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    
    const { method, url, data, callback } = options;
    
    try {
      if (method === 'GET') {
        const params = new URLSearchParams(data).toString();
        xhr.open(method, url + (params ? `?${params}` : ''));
        xhr.send();
      } else {
        xhr.open(method, url);
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key]);
        }
        xhr.send(formData);
      }
      
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          callback(null, xhr.response);
        } else {
          callback(xhr.response.error || 'Ошибка сервера');
        }
      };
      
      xhr.onerror = () => {
        callback('Ошибка соединения');
      };
      
    } catch (e) {
      callback(e);
    }
  }