fetch("data/contact-data.json")
    .then(res => res.json())
    .then(data => {

        // Hero
        document.getElementById("heroTitle").textContent = data.hero.title;
        document.getElementById("heroSubtitle").textContent = data.hero.subtitle;

        // Get in Touch
        document.getElementById("touchTitle").textContent = data.getInTouch.title;
        document.getElementById("touchDesc").textContent = data.getInTouch.description;


        // Hero background image
        const hero = document.getElementById("heroSection");
        hero.style.backgroundImage = `url(${data.hero.backgroundImage})`;
        hero.style.backgroundSize = "cover";
        hero.style.backgroundPosition = "center";
        hero.style.backgroundRepeat = "no-repeat";

        const itemsContainer = document.getElementById("contactItems");
        data.getInTouch.items.forEach(item => {
            itemsContainer.innerHTML += `
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-${item.icon}"></i>
                    </div>
                    <div class="contact-details">
                        <h3>${item.title}</h3>
                        <p>${item.content}</p>
                    </div>
                </div>
            `;
        });

        // Social Icons
        const socialContainer = document.getElementById("socialIcons");
        socialContainer.innerHTML = "";

        data.getInTouch.social.forEach(item => {
            socialContainer.innerHTML += `
    <a href="${item.link}" target="_blank" class="social-icon">
      <i class="fab fa-${item.icon}"></i>
    </a>
  `;
        });


        // Form
        document.getElementById("formTitle").textContent = data.form.title;
        document.getElementById("formBtn").textContent = data.form.buttonText;

    })
    .catch(err => console.error("Contact JSON error:", err));


