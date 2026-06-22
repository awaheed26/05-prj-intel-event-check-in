let totalAttendance = 0;
let waterWiseCount = 0;
let netZeroCount = 0;
let renewablesCount = 0;
const attendanceGoal = 50;
let attendees = [];

// Select DOM elements safely
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const totalCount = document.getElementById("attendeeCount");

const waterWiseDisplay = document.getElementById("waterCount");
const netZeroDisplay = document.getElementById("zeroCount");
const renewablesDisplay = document.getElementById("powerCount");
const progressBar = document.getElementById("progressBar");

// Elements that might be missing in the base HTML layout
const attendeeList = document.getElementById("attendeeList");
const celebration = document.getElementById("celebration");

function checkIn(event) {
    // Stop the page from refreshing automatically
    event.preventDefault();

    if (!nameInput || !teamSelect) return;

    const name = nameInput.value.trim();
    const team = teamSelect.value;

    if (name === "" || !team) {
        alert("Please enter a name and select a team.");
        return;
    }

    // 1. Greet Attendees on Check-In
let teamName = "";

if (team === "water") {
    teamName = "Team Water Wise";
} else if (team === "zero") {
    teamName = "Team Net Zero";
} else if (team === "power") {
    teamName = "Team Renewables";
}

if (greeting) {
    greeting.textContent = `🎉 Welcome ${name}! Your check-in has been confirmed. You are now part of ${teamName}.`;
    greeting.style.display = "block";
    greeting.className = "success-message";
}
    

    // 2. Implement Attendance Counting
    totalAttendance++;
    if (totalCount) totalCount.textContent = totalAttendance;

    // 3. Team Attendance Tracker
    if (team === "water") {
        waterWiseCount++;
        if (waterWiseDisplay) waterWiseDisplay.textContent = waterWiseCount;
    } else if (team === "zero") {
        netZeroCount++;
        if (netZeroDisplay) netZeroDisplay.textContent = netZeroCount;
    } else if (team === "power") {
        renewablesCount++;
        if (renewablesDisplay) renewablesDisplay.textContent = renewablesCount;
    }

    // Save individual attendee records
    attendees.push({ name, team });

    // 4. Update Progress Bar, Array Displays, and Storage
    updateProgress();
    displayAttendees();
    saveCounts();
    checkWinner();

    // Reset input fields cleanly
    nameInput.value = "";
    teamSelect.selectedIndex = 0;
}

function updateProgress() {
    let percent = (totalAttendance / attendanceGoal) * 100;
    if (percent > 100) percent = 100;

    if (progressBar) {
        progressBar.style.width = percent + "%";
    }
}

function displayAttendees() {
    if (!attendeeList) return; 
    attendeeList.innerHTML = "";

    attendees.forEach(person => {
        const item = document.createElement("li");
        item.textContent = `${person.name} - ${person.team}`;
        attendeeList.appendChild(item);
    });
}

function checkWinner() {
    if (!celebration) return; 

    if (totalAttendance >= attendanceGoal) {
        let winningTeam = "Team Water Wise";
        let highest = waterWiseCount;

        if (netZeroCount > highest) {
            highest = netZeroCount;
            winningTeam = "Team Net Zero";
        }
        if (renewablesCount > highest) {
            highest = renewablesCount;
            winningTeam = "Team Renewables";
        }

        celebration.textContent = `🎉 Attendance goal reached! ${winningTeam} is leading with ${highest} attendees!`;
    }
}

function saveCounts() {
    localStorage.setItem("totalAttendance", totalAttendance);
    localStorage.setItem("waterWiseCount", waterWiseCount);
    localStorage.setItem("netZeroCount", netZeroCount);
    localStorage.setItem("renewablesCount", renewablesCount);
    localStorage.setItem("attendees", JSON.stringify(attendees));
}

function loadCounts() {
    totalAttendance = Number(localStorage.getItem("totalAttendance")) || 0;
    waterWiseCount = Number(localStorage.getItem("waterWiseCount")) || 0;
    netZeroCount = Number(localStorage.getItem("netZeroCount")) || 0;
    renewablesCount = Number(localStorage.getItem("renewablesCount")) || 0;
    attendees = JSON.parse(localStorage.getItem("attendees")) || [];

    if (totalCount) totalCount.textContent = totalAttendance;
    if (waterWiseDisplay) waterWiseDisplay.textContent = waterWiseCount;
    if (netZeroDisplay) netZeroDisplay.textContent = netZeroCount;
    if (renewablesDisplay) renewablesDisplay.textContent = renewablesCount;

    updateProgress();
    displayAttendees();
}

// CRITICAL FIX: Explicitly mount the listener to the form element
const checkInForm = document.getElementById("checkInForm");
if (checkInForm) {
    checkInForm.addEventListener("submit", checkIn);
}

// Execute initial local storage readout
loadCounts();