// DOM Elements
const bgMusic = document.getElementById('bgMusic');
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const openLetterBtn = document.getElementById('openLetterBtn');
const envelopeContainer = document.getElementById('envelopeContainer');
const letterContainer = document.getElementById('letterContainer');
const showDateBtn = document.getElementById('showDateBtn');
const dateDisplay = document.getElementById('dateDisplay');
const continueBtn = document.getElementById('continueBtn');
const continueToFinalBtn = document.getElementById('continueToFinalBtn');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const heartsRain = document.getElementById('heartsRain');
const photoSection = document.getElementById('photoSection');
const loveMessage = document.getElementById('loveMessage');
const slideshow = document.getElementById('slideshow');
const slideshowDots = document.getElementById('slideshowDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// State
let currentSlide = 0;
let allPhotosViewed = false;
let musicStarted = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    setupSlideshow();
});

// Start Button Click - Play music and go to letter page
startBtn.addEventListener('click', () => {
    startMusic();
    startScreen.classList.remove('active');
    page1.classList.add('active');
});

// Start background music
function startMusic() {
    if (!musicStarted) {
        bgMusic.volume = 0.5;
        bgMusic.play().catch(err => {});
        musicStarted = true;
    }
}

// Create floating hearts background
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['❤', '💕', '💗', '💖', '💝'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        container.appendChild(heart);
    }
}

// Open Letter Button Click
openLetterBtn.addEventListener('click', () => {
    envelopeContainer.classList.add('hidden');
    letterContainer.classList.remove('hidden');
    
    // Show "Show Date" button after letter appears
    setTimeout(() => {
        showDateBtn.classList.remove('hidden');
        showDateBtn.style.animation = 'fadeIn 0.5s ease-out forwards';
    }, 1000);
});

// Show Date Button Click
showDateBtn.addEventListener('click', () => {
    showDateBtn.classList.add('hidden');
    dateDisplay.classList.remove('hidden');
    
    // Show Continue button after date appears
    setTimeout(() => {
        continueBtn.classList.remove('hidden');
        continueBtn.style.animation = 'fadeIn 0.5s ease-out forwards';
    }, 800);
});

// Continue Button Click - Go to Page 2
continueBtn.addEventListener('click', () => {
    page1.classList.remove('active');
    page2.classList.add('active');
    
    // Start hearts rain
    createHeartsRain();
    
    // Setup scroll observer for photos
    setupPhotoObserver();
});

// Create raining hearts for Page 2
function createHeartsRain() {
    const hearts = ['❤', '💕', '💗', '💖', '💝', '💘', '💓'];
    
    // Create hearts continuously
    const rainInterval = setInterval(() => {
        if (!page2.classList.contains('active')) {
            clearInterval(rainInterval);
            return;
        }
        
        const heart = document.createElement('div');
        heart.className = 'rain-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heartsRain.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 200);
}

// Setup photo observer for scroll reveal
function setupPhotoObserver() {
    const photos = document.querySelectorAll('.photo-item');
    let viewedCount = 0;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                entry.target.classList.add('visible');
                viewedCount++;
                
                // Check if all photos have been viewed
                if (viewedCount >= photos.length && !allPhotosViewed) {
                    allPhotosViewed = true;
                    setTimeout(() => {
                        continueToFinalBtn.classList.remove('hidden');
                        continueToFinalBtn.style.animation = 'fadeIn 0.8s ease-out forwards';
                    }, 1000);
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });
    
    photos.forEach(photo => observer.observe(photo));
    
    // Show first photo immediately
    setTimeout(() => {
        photos[0].classList.add('visible');
    }, 500);
}

// Continue to Final Page
continueToFinalBtn.addEventListener('click', () => {
    page2.classList.remove('active');
    page3.classList.add('active');
    
    // Show love message for 5 seconds, then slideshow
    setTimeout(() => {
        loveMessage.classList.add('hidden');
        slideshow.classList.remove('hidden');
    }, 5000);
});

// Setup Slideshow
function setupSlideshow() {
    const slides = document.querySelectorAll('.slide');
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        slideshowDots.appendChild(dot);
    });
    
    // Auto-advance slides
    setInterval(() => {
        if (page3.classList.contains('active') && !slideshow.classList.contains('hidden')) {
            nextSlide();
        }
    }, 4000);
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Slideshow navigation
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Touch swipe support for slideshow
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.slideshow-wrapper')?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slideshow-wrapper')?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}
