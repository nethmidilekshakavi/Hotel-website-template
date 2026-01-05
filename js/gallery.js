document.addEventListener("DOMContentLoaded", () => {
    fetch("data/gallery.json")
        .then(res => {
            if (!res.ok) {
                throw new Error("gallery.json not found");
            }
            return res.json();
        })
        .then(data => {
            // Section title & subtitle
            document.getElementById("galleryTitle").textContent = data.section.title;
            document.getElementById("gallerySubtitle").textContent = data.section.subtitle;

            // Gallery images
            const container = document.getElementById("galleryContainer");
            container.innerHTML = "";

            data.images.forEach(image => {
                const imgCard = document.createElement("div");
                imgCard.className = "gallery-card";

                imgCard.innerHTML = `
                    <img src="${image.src}" alt="${image.alt}">
                `;

                container.appendChild(imgCard);
            });
        })
        .catch(err => console.error("Gallery JSON Load Error:", err));
});
