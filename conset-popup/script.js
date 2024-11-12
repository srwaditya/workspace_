document.addEventListener('DOMContentLoaded', () => {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptButton = document.getElementById('acceptCookie');

    // Show the popup every time the page is loaded
    cookieConsent.style.display = 'block';

    // Add an event listener to the "Accept" button
    acceptButton.addEventListener('click', () => {
        // Hide the popup when the "Accept" button is clicked
        cookieConsent.style.display = 'none';
    });
});
