document.addEventListener("DOMContentLoaded", () => {
    fetch("data/nav-data.json")
        .then(res => res.json())
        .then(data => {

            const logo = document.getElementById("logo");

            logo.innerHTML = `
        <img src="${data.logo.image}" alt="Hotel Logo" class="logo-img">
        <span class="logo-text">${data.logo.text}</span>
      `;

            const navMenu = document.getElementById("navMenu");
            navMenu.innerHTML = "";

            data.menu.forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = `
          <a href="${item.link}" class="${item.active ? "active" : ""}">
            ${item.name}
          </a>
        `;
                navMenu.appendChild(li);
            });

            const bookLi = document.createElement("li");
            bookLi.innerHTML = `
        <a href="${data.bookNow.link}" class="book-btn">
          ${data.bookNow.name}
        </a>
      `;
            navMenu.appendChild(bookLi);
        });
});

document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

});
