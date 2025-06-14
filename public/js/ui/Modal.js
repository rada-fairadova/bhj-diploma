/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  constructor(element) {
    if (!element) throw new Error('Element not found');
    this.element = element;
    this.registerEvents();
  }
  
  open() { this.element.style.display = 'block'; }
  close() { this.element.style.display = 'none'; }
  
  onClose(e) {
    e.preventDefault();
    this.close();
  }
  
  registerEvents() {
    const closeButtons = this.element.querySelectorAll('[data-dismiss="modal"]');
    closeButtons.forEach(button => {
      button.addEventListener('click', (e) => this.onClose(e));
    });
  }
}