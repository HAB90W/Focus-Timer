let timeLeft = 25 * 60; 
let timerId = null;
let currentPreset = 25 * 60;

const timerDisplay = document.getElementById('timer');

function updateDisplay() {
    let hours = Math.floor(timeLeft / 3600);
    let minutes = Math.floor((timeLeft % 3600) / 60);
    let seconds = timeLeft % 60;

    let displayString = "";

    if (hours > 0) {
        // Format: H:MM:SS
        displayString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        // Format: MM:SS
        displayString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    timerDisplay.textContent = displayString;
}

function setTime(mins) {
    pauseTimer();
    timeLeft = mins * 60;
    currentPreset = timeLeft;
    updateDisplay();
}

function startTimer() {
    // Prevent multiple timers from running at once
    if (timerId !== null) return;
    
    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerId);
            timerId = null;
            alert("Session complete! Time for a break.");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    pauseTimer();
    timeLeft = currentPreset;
    updateDisplay();
}

// Initial call to show the timer immediately on page load
updateDisplay();