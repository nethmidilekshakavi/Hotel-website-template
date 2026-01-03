let currentIndex = 0;
let slidesData = [];

const slidesWrapper = document.getElementById("slidesWrapper");
const dotsWrapper = document.getElementById("sliderDots");

fetch("data/slider-data.json")
    .then(res => res.json())
    .then(data => {
        slidesData = data.slides;
        renderSlides();
        renderDots();
        showSlide(0);
        autoSlide();
    });

function renderSlides() {
    slidesWrapper.innerHTML = "";

    slidesData.forEach((slide, index) => {
        const slideDiv = document.createElement("div");
        slideDiv.className = "slide";

        slideDiv.innerHTML = `
      <img src="${slide.image}" alt="${slide.alt}">
      <div class="slide-overlay"></div>
      <div class="slide-content">
        <h1>${slide.title}</h1>
        <p>${slide.description}</p>
        <div class="cta-buttons">
          ${slide.buttons.map(btn => `
            <a href="${btn.link}" class="cta-btn cta-${btn.type}">
              ${btn.text}
            </a>
          `).join("")}
        </div>
      </div>
    `;

        slidesWrapper.appendChild(slideDiv);
    });
}

function renderDots() {
    dotsWrapper.innerHTML = "";

    slidesData.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.className = "slider-dot";
        dot.addEventListener("click", () => showSlide(index));
        dotsWrapper.appendChild(dot);
    });
}

function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".slider-dot");

    if (index >= slides.length) currentIndex = 0;
    else if (index < 0) currentIndex = slides.length - 1;
    else currentIndex = index;

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
}

// Arrows
document.getElementById("nextSlide").onclick = () => showSlide(currentIndex + 1);
document.getElementById("prevSlide").onclick = () => showSlide(currentIndex - 1);

// Auto slide
function autoSlide() {
    setInterval(() => {
        showSlide(currentIndex + 1);
    }, 5000);
}
