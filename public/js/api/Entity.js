/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */

class Entity {
  static URL = '';
  
  static list(data, callback) {
    createRequest({
      url: this.URL,
      method: 'GET',
      data,
      callback
    });
  }
  
  static create(data, callback) {
    createRequest({
      url: this.URL,
      method: 'PUT',
      data,
      callback
    });
  }
  
  static remove(data, callback) {
    createRequest({
      url: this.URL,
      method: 'DELETE',
      data,
      callback
    });
  }
}
