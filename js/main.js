// =========================
// DOM ELEMENTS
// =========================
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.querySelector('.scroll-top');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// =========================
// CAROUSEL (SAFE)
// =========================
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (track && slides.length > 0 && nextBtn && prevBtn) {
  let index = 1;
  let isMoving = false;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  const allSlides = document.querySelectorAll('.slide');

  function updateSlide(animate = true) {
    track.style.transition = animate ? "transform 0.4s ease" : "none";
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  updateSlide(false);

  nextBtn.addEventListener('click', () => {
    if (isMoving) return;
    isMoving = true;
    index++;
    updateSlide();
  });

  prevBtn.addEventListener('click', () => {
    if (isMoving) return;
    isMoving = true;
    index--;
    updateSlide();
  });

  track.addEventListener('transitionend', () => {
    if (allSlides[index] === firstClone) {
      index = 1;
      updateSlide(false);
    }

    if (allSlides[index] === lastClone) {
      index = allSlides.length - 2;
      updateSlide(false);
    }

    isMoving = false;
  });
}


// =========================
// MOBILE MENU TOGGLE
// =========================
if (mobileMenu && navMenu) {
  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu + set active saat klik
if (navLinks.length > 0) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.remove('active');
      navMenu?.classList.remove('active');

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// =========================
// NAVBAR SCROLL EFFECT
// =========================
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }

  if (window.scrollY > 500) {
    scrollTopBtn?.classList.add('active');
  } else {
    scrollTopBtn?.classList.remove('active');
  }

  updateActiveNav();
});

// =========================
// UPDATE ACTIVE NAV (FIXED)
// =========================
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  if (sections.length === 0) return;

  const navbarHeight = navbar ? navbar.offsetHeight : 80;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionId = section.getAttribute('id');

    // 🔥 cek apakah section sedang terlihat di viewport
    if (
      rect.top <= navbarHeight + 50 &&
      rect.bottom >= navbarHeight + 50
    ) {
      navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// =========================
// SMOOTH SCROLLING (FIXED)
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    e.preventDefault();

    const navbarHeight = navbar ? navbar.offsetHeight : 80;

    // 🔥 pakai getBoundingClientRect (AKURAT)
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: targetPosition - navbarHeight,
      behavior: 'smooth'
    });
  });
});

// =========================
// INIT SAAT LOAD (PENTING)
// =========================
window.addEventListener('load', () => {
  updateActiveNav();
});

// =========================
// SCROLL TO TOP BUTTON
// =========================
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// =========================
// CONTACT FORM
// =========================
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const message = document.getElementById('message')?.value;

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    alert('Thank you for your message! We will get back to you soon.');
    contactForm.submit();
  });
}

// =========================
// NEWSLETTER FORM
// =========================
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = newsletterForm.querySelector('input[type="email"]')?.value;

    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    alert('Thank you for subscribing!');
    newsletterForm.reset();
  });
}