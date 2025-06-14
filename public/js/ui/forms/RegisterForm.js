/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  onSubmit(options) {
    User.register(options, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.getModal('register').close();
        App.setState('user-logged');
      }
    });
  }
}