// Main JavaScript File with JSON Data Loading

// JSON Data Structure
const hotelData = {
    "logo": {
        "text": "ROYELLE",
        "icon": "R",
        "image": "images/logo.png"
    },
    "slider": [
        {
            "title": "EXPERIENCE LUXURY",
            "description": "Indulge in world-class hospitality and unforgettable moments",
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80",
            "primaryBtn": "Book Your Stay",
            "secondaryBtn": "Explore Rooms"
        },
        {
            "title": "PARADISE AWAITS",
            "description": "Relax by our infinity pool with breathtaking views",
            "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80",
            "primaryBtn": "Reserve Now",
            "secondaryBtn": "View Facilities"
        },
        {
            "title": "CULINARY EXCELLENCE",
            "description": "Savor exquisite dishes crafted by world-renowned chefs",
            "image": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920&q=80",
            "primaryBtn": "View Menu",
            "secondaryBtn": "Make Reservation"
        },
        {
            "title": "ELEGANT SUITES",
            "description": "Immerse yourself in comfort and sophisticated design",
            "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1920&q=80",
            "primaryBtn": "Explore Suites",
            "secondaryBtn": "View Amenities"
        }
    ],
    "features": [
        {
            "icon": "🏨",
            "title": "Luxury Rooms",
            "description": "Experience ultimate comfort in our elegantly designed rooms"
        },
        {
            "icon": "🍽️",
            "title": "Fine Dining",
            "description": "Indulge in culinary excellence at our world-class restaurants"
        },
        {
            "icon": "💆",
            "title": "Spa & Wellness",
            "description": "Rejuvenate your mind and body at our premium spa"
        },
        {
            "icon": "🏊",
            "title": "Infinity Pool",
            "description": "Dive into relaxation with stunning panoramic views"
        }
    ]
};

// Initialize Application
function initializeApp() {
    loadLogo();
    loadSlider();
    setupAnimations();
    setupFormValidation();
}

// Load Logo from JSON
function loadLogo() {
    const logoText = document.getElementById('logoText');
    const logoIcon = document.getElementById('logoIcon');

    if (logoText) {
        logoText.textContent = hotelData.logo.text;

        // Add letter animation
        const letters = logoText.textContent.split('');
        logoText.textContent = '';

        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.animationDelay = `${index * 0.05}s`;
            logoText.appendChild(span);
        });
    }

    if (logoIcon) {
        logoIcon.textContent = hotelData.logo.icon;
    }
}

// Load Slider from JSON
function loadSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const sliderNav = document.querySelector('.slider-nav');

    if (!sliderContainer) return;

    // Remove existing slides
    document.querySelectorAll('.slide').forEach(slide => slide.remove());

    // Clear slider navigation
    if (sliderNav) {
        sliderNav.innerHTML = '';
    }

    // Create slides from JSON data
    hotelData.slider.forEach((slideData, index) => {
        // Create slide element
        const slide = document.createElement('div');
        slide.className = index === 0 ? 'slide active' : 'slide';

        slide.innerHTML = `
            <img src="${slideData.image}" alt="${slideData.title}" loading="${index === 0 ? 'eager' : 'lazy'}">
            <div class="slide-overlay"></div>
            <div class="slide-content">
                <h1>${slideData.title}</h1>
                <p>${slideData.description}</p>
                <div class="cta-buttons">
                    <a href="#book" class="cta-btn cta-primary">${slideData.primaryBtn}</a>
                    <a href="#explore" class="cta-btn cta-secondary">${slideData.secondaryBtn}</a>
                </div>
            </div>
        `;

        // Insert before arrows
        const firstArrow = sliderContainer.querySelector('.slider-arrow');
        if (firstArrow) {
            sliderContainer.insertBefore(slide, firstArrow);
        } else {
            sliderContainer.appendChild(slide);
        }

        // Create navigation dot
        if (sliderNav) {
            const dot = document.createElement('span');
            dot.className = index === 0 ? 'slider-dot active' : 'slider-dot';
            dot.onclick = () => currentSlide(index);
            sliderNav.appendChild(dot);
        }
    });

    // Reinitialize slider after loading
    reinitializeSlider();
}

// Reinitialize Slider
function reinitializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (dots[i]) {
                dots[i].classList.remove('active');
            }
        });

        if (index >= slides.length) currentIndex = 0;
        if (index < 0) currentIndex = slides.length - 1;

        slides[currentIndex].classList.add('active');
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }

    // Make functions globally available
    window.changeSlide = function(direction) {
        currentIndex += direction;
        showSlide(currentIndex);
    };

    window.currentSlide = function(index) {
        currentIndex = index;
        showSlide(currentIndex);
    };
}

// Setup Animations
function setupAnimations() {
    // Add entrance animations to elements
    const animateElements = document.querySelectorAll('.form-group, .cta-btn, .feature-card');

    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Form Validation
function setupFormValidation() {
    const searchForm = document.querySelector('.search-form');

    if (!searchForm) return;

    const locationInput = searchForm.querySelector('input[type="text"]');
    const checkInInput = searchForm.querySelector('input[type="date"]:nth-of-type(1)');
    const checkOutInput = searchForm.querySelector('input[type="date"]:nth-of-type(2)');
    const guestsSelect = searchForm.querySelector('select');
    const searchBtn = searchForm.querySelector('.search-btn');

    // Check-in date change handler
    if (checkInInput) {
        checkInInput.addEventListener('change', function() {
            if (checkOutInput) {
                // Set minimum check-out date to one day after check-in
                const checkInDate = new Date(this.value);
                checkInDate.setDate(checkInDate.getDate() + 1);
                checkOutInput.min = checkInDate.toISOString().split('T')[0];

                // Clear check-out if it's before new minimum
                if (checkOutInput.value && new Date(checkOutInput.value) <= new Date(this.value)) {
                    checkOutInput.value = '';
                }
            }
        });
    }

    // Form submission
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Validate fields
            let isValid = true;
            const errors = [];

            if (locationInput && !locationInput.value.trim()) {
                errors.push('Please enter a location');
                isValid = false;
            }

            if (checkInInput && !checkInInput.value) {
                errors.push('Please select check-in date');
                isValid = false;
            }

            if (checkOutInput && !checkOutInput.value) {
                errors.push('Please select check-out date');
                isValid = false;
            }

            if (guestsSelect && guestsSelect.value === 'Add guests') {
                errors.push('Please select number of guests');
                isValid = false;
            }

            if (!isValid) {
                showNotification(errors.join('<br>'), 'error');
                return;
            }

            // If valid, proceed with search
            performSearch({
                location: locationInput.value,
                checkIn: checkInInput.value,
                checkOut: checkOutInput.value,
                guests: guestsSelect.value
            });
        });
    }
}

// Perform Search
function performSearch(data) {
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn) {
        searchBtn.innerHTML = '⏳';
        searchBtn.style.pointerEvents = 'none';

        // Simulate API call
        setTimeout(() => {
            console.log('Search Data:', data);
            searchBtn.innerHTML = '✓';
            showNotification('Search completed! Redirecting...', 'success');

            setTimeout(() => {
                searchBtn.innerHTML = '🔍';
                searchBtn.style.pointerEvents = 'auto';
                // window.location.href = '/search-results';
            }, 1500);
        }, 2000);
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '30px',
        padding: '20px 30px',
        background: type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6',
        color: '#fff',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        zIndex: 10000,
        animation: 'slideInRight 0.4s ease',
        fontWeight: '500',
        maxWidth: '400px'
    });

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Loading Screen
function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            transition: opacity 0.5s ease;
        ">
            <div style="text-align: center; color: white;">
                <div style="
                    width: 60px;
                    height: 60px;
                    border: 4px solid rgba(255,255,255,0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                "></div>
                <h2 style="font-size: 24px; font-weight: 700; letter-spacing: 3px;">ROYELLE</h2>
                <p style="margin-top: 10px; opacity: 0.8;">Loading your experience...</p>
            </div>
        </div>
    `;

    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);

    document.body.appendChild(loader);
}

function hideLoadingScreen() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
}

// Page Load Events
window.addEventListener('load', () => {
    hideLoadingScreen();
});

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    showLoadingScreen();
    initializeApp();
});

// Export data for use in other scripts
window.hotelData = hotelData;

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%cPage Load Time: ${pageLoadTime}ms`, 'color: #10b981; font-weight: bold;');
    });
}