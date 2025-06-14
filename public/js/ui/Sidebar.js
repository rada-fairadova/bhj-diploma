/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }
  
  static initToggleButton() {
    document.querySelector('.sidebar-toggle').addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-collapse');
    });
  }
  
  static initAuthLinks() {
    document.querySelector('.menu-item_login a').addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('login').open();
    });
    
    document.querySelector('.menu-item_register a').addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('register').open();
    });
    
    document.querySelector('.menu-item_logout a').addEventListener('click', (e) => {
      e.preventDefault();
      User.logout((err, response) => {
        if (response && response.success) {
          App.setState('init');
        }
      });
    });
  }
}