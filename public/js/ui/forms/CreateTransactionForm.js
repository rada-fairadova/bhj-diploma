/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }
  
  renderAccountsList() {
    Account.list({}, (err, response) => {
      if (response && response.success) {
        const select = this.element.querySelector('.accounts-select');
        select.innerHTML = response.data.reduce((html, item) => {
          return html + `<option value="${item.id}">${item.name}</option>`;
        }, '');
      }
    });
  }
  
  onSubmit(options) {
    Transaction.create(options, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.getModal(this.element.closest('.modal').dataset.modalId).close();
        App.update();
      }
    });
  }
}