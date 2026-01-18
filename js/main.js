console.log('Kaizenway UA site loaded');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const status = document.getElementById('form-status');

  if (!form || !nameInput || !emailInput || !messageInput || !status) {
    return;
  }

  const showStatus = (text, type) => {
    status.textContent = text;
    status.classList.remove('error', 'success');
    if (type) {
      status.classList.add(type);
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showStatus('Будь ласка, заповніть всі поля форми.', 'error');
      return;
    }

    if (!email.includes('@') || email.length < 5) {
      showStatus('Введіть коректний email.', 'error');
      return;
    }

    const now = new Date();
    const timestamp = now.toISOString().slice(0, 16).replace(/[:T]/g, '-');
    const content = [
      'Звернення клієнта',
      '------------------',
      `Дата: ${now.toLocaleString('uk-UA')}`,
      `Ім’я: ${name}`,
      `Email: ${email}`,
      `Запит: ${message}`,
      '',
      'Компанія: Kaizenway / Veldar',
    ].join('\\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zvernennya-${timestamp}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    showStatus('Дякуємо! Файл звернення збережено.', 'success');
    form.reset();
  });
});
