/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  onSubmit(options) {
    User.login(options, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.getModal('login').close();
        App.setState('user-logged');
      }
    });
  }
}