const body = document.body;
const image = body.querySelector('#coin');
const progress = body.querySelector('.progress');

let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count');
let isClickable = true; // To manage clickability
const coinsRequired = 10; // Number of coins to fill progress
const progressFillDuration = 5000; // Total duration for filling progress in milliseconds
const progressFillInterval = progressFillDuration / coinsRequired; // Interval for filling progress

// Initialize the UI
if (coins == null) {
    localStorage.setItem('coins', '0');
    body.querySelector('h1').textContent = '0';
} else {
    body.querySelector('h1').textContent = Number(coins).toLocaleString();
}

if (total == null) {
    localStorage.setItem('total', '500');
    body.querySelector('#total').textContent = '/500';
} else {
    body.querySelector('#total').textContent = `/${total}`;
}

if (power == null) {
    localStorage.setItem('power', '500');
    body.querySelector('#power').textContent = '500';
} else {
    body.querySelector('#power').textContent = power;
}

if (count == null) {
    localStorage.setItem('count', '1');
}

function updateProgressBar(targetPercentage) {
    progress.style.transition = 'width 0.5s ease-out';
    progress.style.width = `${targetPercentage}%`;
}

function addCoinsGradually() {
    let addedCoins = 0;
    const interval = setInterval(() => {
        if (addedCoins < coinsRequired) {
            coins = localStorage.getItem('coins');
            localStorage.setItem('coins', `${Number(coins) + 1}`);
            body.querySelector('h1').textContent = `${(Number(coins) + 1).toLocaleString()}`;
            addedCoins++;
            updateProgressBar((100 * addedCoins) / coinsRequired);
        } else {
            clearInterval(interval); // Stop adding coins after reaching the desired amount

            // Wait for the progress to fill completely before resetting
            setTimeout(() => {
                progress.style.transition = 'width 0.5s ease-in';
                updateProgressBar(0);
                isClickable = true;
            }, progressFillDuration); // Wait for the duration before resetting
        }
    }, progressFillInterval); // Adjust interval to fill progress in the specified duration
}

image.addEventListener('click', (e) => {
    if (!isClickable) return; // Prevent action if not clickable

    let x = e.offsetX;
    let y = e.offsetY;

    navigator.vibrate(5);

    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');

    

    if (Number(power) > 0) {
        isClickable = false; // Prevent further clicks

        // Start the gradual coin addition
        addCoinsGradually();

        localStorage.setItem('power', `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;

        // Change background color
        body.style.background = 'radial-gradient(circle, rgba(122,230,243,1) 10%, rgba(31,118,191,1) 25%, rgba(23,23,23,1) 75%)';
    }

    // Restore the original background color after 6 seconds
    setTimeout(() => {
        body.style.background = ''; // Reset background color
    }, 10000); // 10 seconds
});

setInterval(() => {
    count = localStorage.getItem('count');
    power = localStorage.getItem('power');
    if (Number(total) > power) {
        localStorage.setItem('power', `${Number(power) + Number(count)}`);
        body.querySelector('#power').textContent = `${Number(power) + Number(count)}`;
        body.querySelector('.progress').style.width = `${(100 * Number(power)) / total}%`;
    }
}, 1000);
