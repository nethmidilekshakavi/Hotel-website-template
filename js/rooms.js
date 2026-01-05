document.addEventListener("DOMContentLoaded", () => {
    fetch("data/rooms.json")
        .then(res => {
            if (!res.ok) {
                throw new Error("rooms.json not found");
            }
            return res.json();
        })
        .then(data => {

            // Section title & subtitle
            document.getElementById("roomsTitle").textContent =
                data.section.title;

            document.getElementById("roomsSubtitle").textContent =
                data.section.subtitle;

            // Rooms
            const container = document.getElementById("roomsContainer");
            container.innerHTML = "";

            data.rooms.forEach(room => {
                const card = document.createElement("div");
                card.className = "room-card";

                card.innerHTML = `
                    <img src="${room.image}" alt="${room.name}">
                    <div class="room-content">
                        <h3>${room.name}</h3>
                        <p class="room-desc">${room.description}</p>
                        <span class="room-price">${room.price}</span>
                        <button class="room-btn" data-id="${room.id}">
                            Book Now
                        </button>
                    </div>
                `;

                container.appendChild(card);
            });
        })
        .catch(err => console.error("Rooms JSON Load Error:", err));
});
