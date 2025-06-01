document.addEventListener('DOMContentLoaded', () => {
  // ====================
  //  Mobile Menu Toggle
  // ====================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isOpen);
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ====================
  //  Smooth Scrolling
  // ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // ====================
  //  Image Lightbox
  // ====================
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  document.body.appendChild(lightbox);

  document.querySelectorAll('.menu-img img').forEach(img => {
    img.addEventListener('click', () => {
      lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
      lightbox.classList.add('active');
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove('active');
  });

  // ====================
  //  Form Validation
  // ====================
  const contactForm = document.getElementById('contactForm');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name validation
    const name = document.getElementById('name').value.trim();
    if (name === '') {
      nameError.textContent = 'Please enter your name';
      isValid = false;
    } else {
      nameError.textContent = '';
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = 'Please enter a valid email address';
      isValid = false;
    } else {
      emailError.textContent = '';
    }

    // Message validation
    const message = document.getElementById('message').value.trim();
    if (message === '') {
      messageError.textContent = 'Please enter your message';
      isValid = false;
    } else {
      messageError.textContent = '';
    }

    if (isValid) {
      contactForm.reset();
      showSuccessMessage();
    }
  });

  function showSuccessMessage() {
    const success = document.createElement('div');
    success.className = 'success-message';
    success.textContent = 'Message sent successfully!';
    contactForm.prepend(success);
    setTimeout(() => success.remove(), 3000);
  }

  // ====================
  //  Business Hours Display
  // ====================
  const currentHours = document.getElementById('current-hours');
  const businessHours = {
    1: { open: 7, close: 20 }, // Monday
    2: { open: 7, close: 20 }, // Tuesday
    3: { open: 7, close: 20 }, // Wednesday
    4: { open: 7, close: 20 }, // Thursday
    5: { open: 7, close: 20 }, // Friday
    6: { open: 8, close: 21 }, // Saturday
    0: { open: 8, close: 21 }  // Sunday
  };

  function updateBusinessHours() {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const hours = businessHours[currentDay];
    
    let status = 'Closed';
    if (currentHour >= hours.open && currentHour < hours.close) {
      status = `Open - Closes at ${hours.close}:00`;
    } else {
      status = `Closed - Opens at ${hours.open}:00 tomorrow`;
    }
    
    currentHours.textContent = `Current Status: ${status}`;
  }
  updateBusinessHours();

  // ====================
  //  Menu Total Calculator
  // ====================
  const checkboxes = document.querySelectorAll('.menu-select');
  const totalDisplay = document.getElementById('menu-total-price');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateTotal);
  });

  function updateTotal() {
    let total = 0;
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        total += parseFloat(checkbox.dataset.price);
      }
    });
    totalDisplay.textContent = total.toFixed(2);
  }
});
