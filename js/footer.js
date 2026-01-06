fetch("data/footer-data.json")
    .then(res => res.json())
    .then(data => {

        // Brand
        document.getElementById("footerBrand").textContent = data.brand.name;
        document.getElementById("footerDesc").textContent = data.brand.description;

        // Social Links
        const socialContainer = document.getElementById("footerSocial");
        data.brand.social.forEach(item => {
            socialContainer.innerHTML += `
                <a href="${item.link}" class="social-link">
                    <i class="bi bi-${item.icon}"></i>
                </a>
            `;
        });

        // Quick Links
        const quickLinks = document.getElementById("quickLinks");
        data.quickLinks.forEach(link => {
            quickLinks.innerHTML += `
                <li>
                    <a href="${link.href}">
                        <i class="bi bi-chevron-right"></i> ${link.label}
                    </a>
                </li>
            `;
        });

        // Services
        const services = document.getElementById("serviceLinks");
        data.services.forEach(service => {
            services.innerHTML += `
                <li>
                    <a href="#">
                        <i class="bi bi-chevron-right"></i> ${service}
                    </a>
                </li>
            `;
        });

        // Contact
        document.getElementById("contactAddress").textContent = data.contact.address;
        document.getElementById("contactPhone").textContent = data.contact.phone;
        document.getElementById("contactPhone").href = `tel:${data.contact.phone}`;
        document.getElementById("contactEmail").textContent = data.contact.email;
        document.getElementById("contactEmail").href = `mailto:${data.contact.email}`;

        // Newsletter
        document.getElementById("newsletterTitle").textContent = data.newsletter.title;
        document.getElementById("newsletterInput").placeholder = data.newsletter.placeholder;

        // Footer Bottom
        document.getElementById("footerCopyright").textContent =
            data.footerBottom.copyright;

        const bottomLinks = document.getElementById("footerBottomLinks");
        data.footerBottom.links.forEach(link => {
            bottomLinks.innerHTML += `<a href="#">${link}</a>`;
        });

    })
    .catch(err => console.error("Footer JSON Error:", err));
