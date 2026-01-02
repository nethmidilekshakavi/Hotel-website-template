// Navigation Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-menu a');

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Navigation Link Click Handler
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.classList.contains('book-btn')) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            link.classList.add('active');
        }

        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll Effect for Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            const offsetTop = target.offsetTop - 85; // 85px navbar height

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Slider Elements
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');

// Show Slide Function
function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (dots[i]) {
            dots[i].classList.remove('active');
        }
    });

    // Handle index boundaries
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }

    // Add active class to current slide and dot
    slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
    }
}

// Change Slide Function (for arrows)
function changeSlide(direction) {
    currentIndex += direction;
    showSlide(currentIndex);
}

// Current Slide Function (for dots)
function currentSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

// Auto-play Slider
let sliderInterval = setInterval(() => {
    currentIndex++;
    showSlide(currentIndex);
}, 5000);

// Pause auto-play on hover
const sliderContainer = document.querySelector('.slider-container');

if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(() => {
            currentIndex++;
            showSlide(currentIndex);
        }, 5000);
    });
}

// Keyboard Navigation for Slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
        clearInterval(sliderInterval);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
        clearInterval(sliderInterval);
    }
});

// Set minimum date for date inputs
const today = new Date().toISOString().split('T')[0];
const dateInputs = document.querySelectorAll('input[type="date"]');

dateInputs.forEach(input => {
    input.setAttribute('min', today);
});

// Search Form Animation
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach((group, index) => {
    group.style.animationDelay = `${index * 0.1}s`;
});

// Add loading state to search button
const searchBtn = document.querySelector('.search-btn');

if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        // Add your search logic here
        this.innerHTML = '⏳';
        this.style.pointerEvents = 'none';

        // Simulate search - replace with actual search logic
        setTimeout(() => {
            this.innerHTML = '✓';
            setTimeout(() => {
                this.innerHTML = '🔍';
                this.style.pointerEvents = 'auto';
            }, 1000);
        }, 1500);
    });
}

// Parallax Effect on Scroll
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.slide.active img');

            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px) scale(1.1)`;
            });

            ticking = false;
        });

        ticking = true;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements (if you add more sections later)
document.querySelectorAll('.feature-card, .content-section').forEach(element => {
    if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    }
});

// Console welcome message
console.log('%c🏨 Welcome to Royelle Hotel! ', 'background: #3b82f6; color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px;');
console.log('%cDeveloped with ❤️', 'color: #3b82f6; font-size: 12px;');