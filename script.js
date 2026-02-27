let timeLeft = 25 * 60; 
let timerId = null;
let currentPreset = 25 * 60;
let expectedEndTime = null; // Stores the exact timestamp when the timer should finish

const timerDisplay = document.getElementById('timer');

function updateDisplay() {
    let hours = Math.floor(timeLeft / 3600);
    let minutes = Math.floor((timeLeft % 3600) / 60);
    let seconds = timeLeft % 60;

    let displayString = "";
    if (hours > 0) {
        displayString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        displayString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    timerDisplay.textContent = displayString;
    // Also update the browser tab title so you can see the time without switching back!
    document.title = `${displayString} - Focus`;
}

function setTime(mins) {
    pauseTimer();
    timeLeft = mins * 60;
    currentPreset = timeLeft;
    updateDisplay();
}

function startTimer() {
    if (timerId !== null) return;
    
    // Calculate exactly when the timer should end based on the current time
    expectedEndTime = Date.now() + (timeLeft * 1000);
    
    timerId = setInterval(() => {
        // Calculate remaining time by comparing current clock to the end goal
        const now = Date.now();
        const remaining = Math.round((expectedEndTime - now) / 1000);

        if (remaining <= 0) {
            timeLeft = 0;
            updateDisplay();
            clearInterval(timerId);
            timerId = null;
            alert("Session complete! Time for a break.");
        } else {
            timeLeft = remaining;
            updateDisplay();
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

updateDisplay();