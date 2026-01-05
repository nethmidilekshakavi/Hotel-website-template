document.addEventListener("DOMContentLoaded", () => {
    fetch("data/services.json")
        .then(res => {
            if (!res.ok) {
                throw new Error("services.json not found");
            }
            return res.json();
        })
        .then(data => {
            const container = document.getElementById("servicesContainer");
            container.innerHTML = "";

            data.services.forEach(service => {
                const card = document.createElement("div");
                card.className = "service-card";

                card.innerHTML = `
                    <div class="service-icon">
                        <i class="bi ${service.icon}"></i>
                    </div>
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-desc">${service.description}</p>
                `;

                container.appendChild(card);
            });
        })
        .catch(err => console.error("Services JSON Load Error:", err));
});
