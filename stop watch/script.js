const time = document.getElementById("time");
const lapsList = document.getElementById("laps");
let timer = null;
let starttime = 0;
let elapsedtime = 0;
let isRunning = false;
let lapCounter = 1;

function start() {
    if (!isRunning) {
        starttime = Date.now() - elapsedtime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedtime = Date.now() - starttime;
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    starttime = 0;
    elapsedtime = 0;
    isRunning = false;
    lapCounter = 1;
    time.textContent = "00:00:00:00";
    lapsList.innerHTML = ""; // Clear laps list
}

function lap() {
    if (isRunning) {
        const lapTime = calculateLapTime();
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        lapCounter++;
    }
}

function calculateLapTime() {
    const currentTime = Date.now();
    const lapTime = currentTime - starttime;
    const hours = Math.floor(lapTime / (1000 * 60 * 60));
    const minutes = Math.floor(lapTime / (1000 * 60) % 60);
    const seconds = Math.floor(lapTime / 1000 % 60);
    const miliseconds = Math.floor(lapTime % 1000 / 10);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(miliseconds).padStart(2, "0")}`;
}

function update() {
    const currentTime = Date.now();
    elapsedtime = currentTime - starttime;

    let hours = Math.floor(elapsedtime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedtime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedtime / 1000 % 60);
    let miliseconds = Math.floor(elapsedtime % 1000 / 10);
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    miliseconds = String(miliseconds).padStart(2, "0");

    time.textContent = `${hours}:${minutes}:${seconds}:${miliseconds}`;
}
