document.addEventListener("DOMContentLoaded", () => {

    fetch("./data/cta-data.json")
        .then(res => {
            if (!res.ok) throw new Error("CTA JSON not found");
            return res.json();
        })
        .then(data => {

            // Set Title & Description
            document.getElementById("ctaTitle").textContent = data.title;
            document.getElementById("ctaDesc").textContent = data.description;

            // Set Buttons
            const ctaButtons = document.getElementById("ctaButtons");
            ctaButtons.innerHTML = data.buttons.map(btn => `
                <a href="${btn.link}" class="${btn.class}">${btn.text}</a>
            `).join("");

            // Set Features
            const ctaFeatures = document.getElementById("ctaFeatures");
            ctaFeatures.innerHTML = data.features.map(feature => `
                <div class="feature-item">
                    <i class="${feature.icon}"></i>
                    <span>${feature.text}</span>
                </div>
            `).join("");

        })
        .catch(err => console.error("CTA load error:", err));

});
