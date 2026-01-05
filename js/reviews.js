document.addEventListener("DOMContentLoaded", () => {
    fetch("data/reviews.json")
        .then(res => {
            if (!res.ok) {
                throw new Error("reviews.json not found");
            }
            return res.json();
        })
        .then(data => {

            // Section header
            document.getElementById("reviewsLabel").textContent =
                data.section.label;

            document.getElementById("reviewsTitle").textContent =
                data.section.title;

            document.getElementById("reviewsSubtitle").textContent =
                data.section.subtitle;

            // Reviews
            const container = document.getElementById("reviewsContainer");
            container.innerHTML = "";

            data.reviews.forEach(review => {
                const card = document.createElement("div");
                card.className = "review-card";

                card.innerHTML = `
                    <div class="review-header">
                        <img src="${review.image}" alt="${review.name}">
                        <div>
                            <h4>${review.name}</h4>
                            <span>${review.country}</span>
                        </div>
                    </div>

                    <div class="review-stars">
                        ${"★".repeat(review.rating)}
                        ${"☆".repeat(5 - review.rating)}
                    </div>

                    <p class="review-comment">"${review.comment}"</p>
                `;

                container.appendChild(card);
            });
        })
        .catch(err => console.error("Reviews JSON Load Error:", err));
});
