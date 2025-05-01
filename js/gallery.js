// Gallery JavaScript File

// DOM Elements
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryContainer = document.querySelector('.gallery-container');

// Create gallery modal elements
const galleryModal = document.createElement('div');
galleryModal.classList.add('gallery-modal');
galleryModal.innerHTML = `
  <div class="modal-content">
    <button class="modal-close"><i class="fas fa-times"></i></button>
    <img src="" alt="Gallery Image">
    <div class="modal-nav">
      <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
      <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
    </div>
  </div>
`;
document.body.appendChild(galleryModal);

// Gallery variables
let currentIndex = 0;
const modalImage = galleryModal.querySelector('img');
const closeBtn = galleryModal.querySelector('.modal-close');
const prevBtn = galleryModal.querySelector('.prev-btn');
const nextBtn = galleryModal.querySelector('.next-btn');
let filteredItems = [...galleryItems];

// Gallery filtering functionality
if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      
      // Update filtered items array
      filteredItems = [...galleryItems].filter(item => 
        filter === 'all' || item.dataset.category === filter
      );
    });
  });
}

// Open gallery modal
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = filteredItems.indexOf(item);
    
    if (currentIndex !== -1) {
      updateModalImage();
      galleryModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close gallery modal
closeBtn.addEventListener('click', () => {
  galleryModal.classList.remove('active');
  document.body.style.overflow = '';
});

// Click outside to close
galleryModal.addEventListener('click', (e) => {
  if (e.target === galleryModal) {
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Previous button click
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
  updateModalImage();
});

// Next button click
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % filteredItems.length;
  updateModalImage();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!galleryModal.classList.contains('active')) return;
  
  if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    updateModalImage();
  } else if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % filteredItems.length;
    updateModalImage();
  } else if (e.key === 'Escape') {
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Update modal image
function updateModalImage() {
  const currentItem = filteredItems[currentIndex];
  const imgSrc = currentItem.querySelector('img').src;
  const title = currentItem.querySelector('h3').textContent;
  
  modalImage.src = imgSrc;
  modalImage.alt = title;
}