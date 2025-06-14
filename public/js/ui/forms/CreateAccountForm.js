/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  onSubmit(options) {
    Account.create(options, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.getModal('createAccount').close();
        App.update();
      }
    });
  }
}