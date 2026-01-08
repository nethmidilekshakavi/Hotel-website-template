
    document.addEventListener("DOMContentLoaded", () => {

    fetch("data/dining.json")
        .then(res => {
            if (!res.ok) throw new Error("JSON not found");
            return res.json();
        })
        .then(data => {

            // Hero
            document.getElementById("heroTitle").textContent = data.hero.title;
            document.getElementById("heroSubtitle").textContent = data.hero.subtitle;

            // Restaurants
            const restaurantGrid = document.getElementById("restaurantsGrid");
            restaurantGrid.innerHTML = "";

            data.restaurants.forEach(item => {
                restaurantGrid.innerHTML += `
          <div class="restaurant-card">
            <img src="${item.image}" class="restaurant-image" alt="${item.name}">
            <div class="restaurant-content">
              <div class="restaurant-header">
                <h3>${item.name}</h3>
                <span class="cuisine-badge">${item.type}</span>
              </div>
              <p>${item.description}</p>

              <div class="restaurant-features">
                <div class="feature-item">
                  <i class="bi bi-clock"></i>
                  <span>${item.time}</span>
                </div>
                <div class="feature-item">
                  <i class="bi bi-people"></i>
                  <span>Capacity: ${item.capacity}</span>
                </div>
              </div>

              <button class="reserve-btn">Reserve Table</button>
            </div>
          </div>
        `;
            });

            // Menu
            const menuGrid = document.getElementById("menuGrid");
            menuGrid.innerHTML = "";

            data.menu.forEach(item => {
                menuGrid.innerHTML += `
          <div class="menu-card">
            <div class="menu-icon">${item.icon}</div>
            <h4>${item.name}</h4>
            <p>${item.description}</p>
          </div>
        `;
            });

        })
        .catch(error => {
            console.error("Error loading dining.json:", error);
        });

});

