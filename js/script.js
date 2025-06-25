// script.js

document.addEventListener('DOMContentLoaded', () => {

  // Variables para el menú ocultable
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;

  // Mostrar/Ocultar menú según scroll
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scroll hacia abajo - ocultar menú
      header.classList.add('nav-hidden');
    } else {
      // Scroll hacia arriba - mostrar menú
      header.classList.remove('nav-hidden');
    }
    lastScrollY = currentScrollY;

    // Animaciones fade-in al hacer scroll
    const fadeElems = document.querySelectorAll('.scroll-fade');
    fadeElems.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  });

  // Validación y manejo de formulario contacto
  const form = document.querySelector('form');
  const inputs = form ? form.querySelectorAll('input[type="text"], input[type="email"], textarea') : [];
  const responseMsg = document.querySelector('.form-response');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      // Resetear errores
      inputs.forEach(input => input.classList.remove('error'));
      if (responseMsg) responseMsg.textContent = '';

      // Validar campos
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('error');
          valid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
          input.classList.add('error');
          valid = false;
        }
      });

      if (!valid) {
        if (responseMsg) {
          responseMsg.textContent = 'Por favor, rellena todos los campos correctamente.';
          responseMsg.style.color = '#d94444'; // rojo error
        }
        return;
      }

      // Simular envío y mostrar confirmación
      if (responseMsg) {
        responseMsg.style.color = 'var(--verde-oscuro)';
        responseMsg.textContent = 'Gracias por tu mensaje. Te responderé pronto.';
      }

      form.reset();
    });
  }

  // Función para validar email básico
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

});
