fetch("data/about-data.json")
    .then(res => res.json())
    .then(data => {

        /* LEFT CONTENT */
        const content = document.getElementById("aboutContent");

        content.innerHTML = `
      <div class="about-label">${data.label}</div>
      <h2>${data.title} <span>${data.titleHighlight}</span></h2>

      ${data.descriptions
            .map(desc => `<p class="about-description">${desc}</p>`)
            .join("")}

      <div class="about-features">
        ${data.features
            .map(
                feature => `
          <div class="feature-item">
            <div class="feature-icon">
              <i class="bi ${feature.icon}"></i>
            </div>
            <span class="feature-text">${feature.text}</span>
          </div>`
            )
            .join("")}
      </div>

      <a href="${data.button.link}" class="learn-more-btn">
        ${data.button.text}
      </a>
    `;

        /* RIGHT IMAGES */
        const images = document.getElementById("aboutImages");

        images.innerHTML = `
      <div class="about-img-grid">
        ${data.images
            .map(
                img => `
          <div class="about-img-item">
            <img src="${img.src}" alt="${img.alt}">
          </div>`
            )
            .join("")}
      </div>

      <div class="experience-badge">
        <span class="number">${data.experience.years}</span>
        <span class="text">${data.experience.label}</span>
      </div>
    `;
    })
    .catch(err => console.error("About section load error:", err));
