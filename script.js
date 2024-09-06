// scripts.js

let coinCount = 0;
const coinElement = document.getElementById('coin');
const coinCountElement = document.getElementById('coin-count');

coinElement.addEventListener('click', () => {
    coinCount++;
    coinCountElement.textContent = `${coinCount} سکه`;
});

function navigate(page) {
    alert(`در حال انتقال به صفحه ${page}...`);
}
