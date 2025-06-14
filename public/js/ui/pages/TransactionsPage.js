/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  constructor(element) {
    if (!element) {
      throw new Error('Element not found');
    }
    this.element = element;
    this.registerEvents();
  }
  
  registerEvents() {
    this.element.querySelector('.remove-account').addEventListener('click', (e) => {
      e.preventDefault();
      this.removeAccount();
    });
    
    this.element.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.transaction__remove');
      if (removeBtn) {
        e.preventDefault();
        this.removeTransaction(removeBtn.dataset.id);
      }
    });
  }
  
  render(options) {
    if (!options) return;
    this.lastOptions = options;
    
    Account.get(options.account_id, (err, response) => {
      if (response && response.success) {
        this.renderTitle(response.data.name);
      }
    });
    
    Transaction.list(options, (err, response) => {
      if (response && response.success) {
        this.renderTransactions(response.data);
      }
    });
  }
  
  removeAccount() {
    if (!this.lastOptions) return;
    
    if (confirm('Вы действительно хотите удалить счёт?')) {
      Account.remove({ id: this.lastOptions.account_id }, (err, response) => {
        if (response && response.success) {
          App.updateWidgets();
          App.updateForms();
        }
      });
    }
  }
  
  removeTransaction(id) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove({ id }, (err, response) => {
        if (response && response.success) {
          App.update();
        }
      });
    }
  }
  
  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
  }
  
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }
  
  renderTitle(name) {
    this.element.querySelector('.content-title').textContent = name;
  }
  
  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return date.toLocaleDateString('ru-RU', options) + ' г.';
  }
  
  getTransactionHTML(item) {
    return `
      <div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
          </button>
        </div>
      </div>
    `;
  }
  
  renderTransactions(data) {
    const content = this.element.querySelector('.content');
    content.innerHTML = data.reduce((html, item) => {
      return html + this.getTransactionHTML(item);
    }, '');
  }
}