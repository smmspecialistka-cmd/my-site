// ============ CUSTOM CURSOR ============
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.classList.add('visible');
});

(function animateCursor() {
  curX += (mouseX - curX) * 0.45;
  curY += (mouseY - curY) * 0.45;
  cursor.style.left = curX + 'px';
  cursor.style.top  = curY + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Nav scroll shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Burger menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-item__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.service-card, .why-card, .step, .faq-item, .portfolio-thumb, .section-head'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ============ PORTFOLIO MODAL ============
const cases = [
  {
    url:   'https://juliashic.github.io/SMMMSPECIALISTKA-CMD.github.io/',
    title: 'Екатерина LASH — мастер по наращиванию ресниц',
  },
  {
    url:   'https://juliashic.github.io/alinanur/',
    title: 'Алина Нур — фотограф в Уфе',
  },
];

// Масштаб превью-iframe в карточках
function scaleThumbs() {
  document.querySelectorAll('.portfolio-thumb__viewport iframe').forEach(iframe => {
    const vp = iframe.parentElement;
    const w  = vp.offsetWidth;
    if (!w) return;
    iframe.style.transform = `scale(${w / 1280})`;
  });
}
window.addEventListener('load',   scaleThumbs);
window.addEventListener('resize', scaleThumbs);

const pModal = document.getElementById('p-modal');
const pClose = document.getElementById('p-modal-close');

function openModal(idx) {
  document.getElementById('p-modal-iframe').src = cases[idx].url;
  pModal.classList.add('open');
  pModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  pModal.classList.remove('open');
  pModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => { document.getElementById('p-modal-iframe').src = ''; }, 300);
}

// Event delegation — работает на любом дочернем элементе карточки
document.querySelector('.portfolio__grid').addEventListener('click', e => {
  const thumb = e.target.closest('.portfolio-thumb');
  if (thumb) openModal(+thumb.dataset.case);
});
pClose.addEventListener('click', closeModal);
document.getElementById('p-modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ============ ROTATING WORD ============
const rotatingWords = ['продают', 'завлекают', 'интересуют', 'вовлекают', 'восхищают', 'окупаются'];
let rotatingIdx = 0;
const rotatingEl = document.querySelector('.rotating-word');

setInterval(() => {
  rotatingEl.classList.add('fade-out');
  setTimeout(() => {
    rotatingIdx = (rotatingIdx + 1) % rotatingWords.length;
    rotatingEl.textContent = rotatingWords[rotatingIdx];
    rotatingEl.classList.remove('fade-out');
  }, 350);
}, 2000);

// Smooth active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--green-mid)'
      : '';
  });
});
