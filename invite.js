// Get the elements
const inviteButton = document.getElementById('inviteButton');
const qrCodeContainer = document.getElementById('qrCodeContainer');
const overlay = document.getElementById('overlay');
const copyButton = document.getElementById('copyButton');
const cancelButton = document.getElementById('cancelButton');

// Show the popup and overlay when the invite button is clicked
inviteButton.addEventListener('click', function () {
    qrCodeContainer.style.display = 'block';
    overlay.style.display = 'block';
});

// Close the popup and overlay when the copy button is clicked
copyButton.addEventListener('click', function () {
    alert('Copied!');
    qrCodeContainer.style.display = 'none';
    overlay.style.display = 'none';
});

// Close the popup and overlay when the cancel button is clicked
cancelButton.addEventListener('click', function () {
    alert('Cancelled!');
    qrCodeContainer.style.display = 'none';
    overlay.style.display = 'none';
});

// Optional: Close the popup if the user clicks on the overlay
overlay.addEventListener('click', function () {
    qrCodeContainer.style.display = 'none';
    overlay.style.display = 'none';
});
