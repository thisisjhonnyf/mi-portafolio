// Theme Toggle 
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Por defecto siempre dark. Solo usamos light si el usuario lo eligió antes.
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  html.setAttribute('data-theme', 'light');
} else {
  // Asegura que esté en dark (elimina el atributo o lo pone explícitamente)
  html.removeAttribute('data-theme');
  // o también puedes usar: html.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
  const isLight = html.getAttribute('data-theme') === 'light';
  
  if (isLight) {
    // Cambiar a dark
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    // Cambiar a light
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// Telefono Menu 
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Cerrar menú al hacer click en un link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Header scroll effect 
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Typing Effect 
const roles = [
  'Desarrollador Backend',
  'Creador de experiencias digitales',
  'Creador de soluciones reales',
  'Apasionado por la tecnología',
  'Visionario de la innovación',
];

const typedEl = document.getElementById('typed-text');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const current = roles[roleIndex];
  
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 40;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 90;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    typingSpeed = 1800; // pausa al final
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 400;
  }

  setTimeout(type, typingSpeed);
}

// Iniciar después de un pequeño delay
setTimeout(type, 800);

// Scroll Animations (Intersection Observer)
const fadeElements = document.querySelectorAll(
  '.section-title, .about-grid, .skill-card, .project-card, .contact-content, .hero-content'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

fadeElements.forEach(el => observer.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});