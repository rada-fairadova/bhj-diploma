/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Element not found');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }
  
  registerEvents() {
    this.element.querySelector('.create-account').addEventListener('click', () => {
      App.getModal('createAccount').open();
    });
    
    this.element.addEventListener('click', (e) => {
      const accountItem = e.target.closest('.account');
      if (accountItem) {
        e.preventDefault();
        this.onSelectAccount(accountItem);
      }
    });
  }
  
  update() {
    if (User.current()) {
      Account.list({}, (err, response) => {
        if (response && response.success) {
          this.clear();
          response.data.forEach(item => this.renderItem(item));
        }
      });
    }
  }
  
  clear() {
    this.element.querySelectorAll('.account').forEach(item => item.remove());
  }
  
  onSelectAccount(element) {
    this.element.querySelectorAll('.account').forEach(item => {
      item.classList.remove('active');
    });
    element.classList.add('active');
    App.showPage('transactions', { account_id: element.dataset.id });
  }
  
  getAccountHTML(item) {
    return `
      <li class="account" data-id="${item.id}">
        <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum} ₽</span>
        </a>
      </li>
    `;
  }
  
  renderItem(item) {
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item));
  }
}