/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {

  }
}

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