document.addEventListener('DOMContentLoaded', () => {
  // === MENÚ OCULTABLE AL HACER SCROLL ===
  const header = document.querySelector('.header, .navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header?.classList.add('nav-hidden');
    } else {
      header?.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
  });

  // === ANIMACIONES CON INTERSECTION OBSERVER ===
  const fadeElements = document.querySelectorAll('.scroll-fade');

  const observerOptions = {
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // === VALIDACIÓN Y SIMULACIÓN DE FORMULARIO ===
  const form = document.querySelector('#contact-form');
  const responseMsg = document.querySelector('#form-response');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const nombre = form.nombre;
      const email = form.email;
      const mensaje = form.mensaje;

      // Limpiar errores previos
      [nombre, email, mensaje].forEach(input => input.classList.remove('error'));
      if (responseMsg) responseMsg.textContent = '';

      // Validación
      let valid = true;

      if (!nombre.value.trim()) {
        nombre.classList.add('error');
        valid = false;
      }

      if (!email.value.trim() || !validateEmail(email.value)) {
        email.classList.add('error');
        valid = false;
      }

      if (!mensaje.value.trim()) {
        mensaje.classList.add('error');
        valid = false;
      }

      if (!valid) {
        if (responseMsg) {
          responseMsg.textContent = 'Por favor, rellena todos los campos correctamente.';
          responseMsg.style.color = '#d94444';
        }
        return;
      }

      // Simular envío
      if (responseMsg) {
        responseMsg.style.color = 'var(--verde-oscuro)';
        responseMsg.textContent = 'Gracias por tu mensaje. Te responderé pronto.';
      }

      form.reset();
    });
  }

  // === FUNCIÓN DE VALIDACIÓN DE EMAIL ===
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
});
