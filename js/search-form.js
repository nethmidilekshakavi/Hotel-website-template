const form = document.getElementById("searchForm");

fetch("data/search-form.json")
    .then(res => res.json())
    .then(data => {
        data.fields.forEach(field => {
            const group = document.createElement("div");
            group.className = "form-group";

            let inputHTML = "";

            if (field.type === "date") {
                inputHTML = `
          <input type="date" name="${field.name}" ${field.required ? "required" : ""}>
        `;
            }

            if (field.type === "select") {
                inputHTML = `
          <select name="${field.name}" ${field.required ? "required" : ""}>
            <option value="">Select ${field.name}</option>
            ${field.options.map(opt => `<option>${opt}</option>`).join("")}
          </select>
        `;
            }

            group.innerHTML = `
        <label>${field.label}</label>
        ${inputHTML}
      `;

            form.appendChild(group);
        });

        // Submit button
        const btn = document.createElement("button");
        btn.type = "submit";
        btn.className = "search-btn";
        btn.textContent = data.submit.text;

        form.appendChild(btn);
    });

// Handle submit
form.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(form);
    const bookingData = Object.fromEntries(formData.entries());

    console.log("Search Data:", bookingData);

    // Example: save to sessionStorage
    sessionStorage.setItem("searchData", JSON.stringify(bookingData));

    // redirect if needed
    // window.location.href = "rooms.html";
});
