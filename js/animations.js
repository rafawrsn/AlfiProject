// Animations JavaScript File

// DOM Elements
const fadeElements = document.querySelectorAll('.fade-in');
const slideLeftElements = document.querySelectorAll('.slide-in-left');
const slideRightElements = document.querySelectorAll('.slide-in-right');
const scaleElements = document.querySelectorAll('.scale-in');
const galleryContainer = document.querySelector('.gallery-container');

// Intersection Observer for animations
const appearOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

// Observe fade in elements
fadeElements.forEach(element => {
  appearOnScroll.observe(element);
});

// Observe slide in elements
slideLeftElements.forEach(element => {
  appearOnScroll.observe(element);
});

slideRightElements.forEach(element => {
  appearOnScroll.observe(element);
});

// Observe scale in elements
scaleElements.forEach(element => {
  appearOnScroll.observe(element);
});

// Gallery container animation
if (galleryContainer) {
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        galleryContainer.classList.add('animate');
        galleryObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  galleryObserver.observe(galleryContainer);
}

// Parallax effect for elements with data-parallax attribute
const parallaxElements = document.querySelectorAll('[data-parallax]');

function handleParallax() {
  parallaxElements.forEach(element => {
    const speed = element.dataset.parallax || 0.2;
    const yPos = -(window.scrollY * speed);
    
    element.style.transform = `translateY(${yPos}px)`;
  });
}

// Only enable parallax on desktop
if (window.innerWidth > 768) {
  window.addEventListener('scroll', handleParallax);
}

// Number counter animation for stats
const numberElements = document.querySelectorAll('.stat .number');

function animateNumber(element) {
  const targetNumber = parseInt(element.textContent);
  let currentNumber = 0;
  const duration = 2000; // ms
  const step = targetNumber / duration * 20; // update every 20ms
  
  element.textContent = '0';
  
  const interval = setInterval(() => {
    currentNumber += step;
    
    if (currentNumber >= targetNumber) {
      element.textContent = targetNumber + '+';
      clearInterval(interval);
    } else {
      element.textContent = Math.floor(currentNumber) + '+';
    }
  }, 20);
}

// Observe number elements for animation
const numberObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    
    animateNumber(entry.target);
    numberObserver.unobserve(entry.target);
  });
}, {
  threshold: 0.8
});

numberElements.forEach(element => {
  numberObserver.observe(element);
});