
   const currentDomain = window.location.origin;

    window.addEventListener("message", function(event) {
    if (event.origin !== "https://demo.trackerstay.com") return;
    if (event.data === "goToNextPage") {
        alert('messagfe');

    window.location.href = currentDomain + "Hotel-website-template/booking.html/";
}
}, false);


    // Optional: auto-adjust iframe height
    window.addEventListener('message', function(e) {
    if (e.data.type === 'iframeHeight') {
    const iframe = document.getElementById('booking-iframe');
    if (iframe) iframe.style.height = e.data.height + 'px';
}
});

