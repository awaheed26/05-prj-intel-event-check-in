// 1. Global State Variables
let totalAttendance = 0;
let waterWiseCount = 0;
let netZeroCount = 0;
let renewablesCount = 0;
const attendanceGoal = 50;
let attendees = [];

// 2. Select DOM Elements safely
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const totalCount = document.getElementById("attendeeCount");
const waterWiseDisplay = document.getElementById("waterCount");
const netZeroDisplay = document.getElementById("zeroCount");
const renewablesDisplay = document.getElementById("powerCount");
const progressBar = document.getElementById("progressBar");
const attendeeList = document.getElementById("attendeeList");
const celebration = document.getElementById("celebration");
const checkInForm = document.getElementById("checkInForm");

// 3. Check-In Function
function checkIn(event) {
    event.preventDefault();

    if (!nameInput || !teamSelect) return;

    const name = nameInput.value.trim();
    const team = teamSelect.value;

    if (name === "" || !team) {
        alert("Please enter a name and select a team.");
        return;
    }

    // greeting
    let teamName = "";
    if (team === "water") teamName = "Team Water Wise";
    else if (team === "zero") teamName = "Team Net Zero";
    else if (team === "power") teamName = "Team Renewables";

    if (greeting) {
        greeting.textContent =
            `🎉 Welcome ${name}! Your check-in has been confirmed. You are now part of ${teamName}.`;
        greeting.style.display = "block";
        greeting.className = "success-message";
    }

    // check if attendee exists
    const existingAttendee = attendees.find(
        attendee => attendee.name.toLowerCase() === name.toLowerCase()
    );

    if (existingAttendee) {
        // remove old team count
        if (existingAttendee.team === "water") waterWiseCount--;
        else if (existingAttendee.team === "zero") netZeroCount--;
        else if (existingAttendee.team === "power") renewablesCount--;

        // update team
        existingAttendee.team = team;
    } else {
        attendees.push({ name, team });
        totalAttendance++;
    }

    // add new team count
    if (team === "water") waterWiseCount++;
    else if (team === "zero") netZeroCount++;
    else if (team === "power") renewablesCount++;

    // update UI text fields directly
    if (totalCount) totalCount.textContent = totalAttendance;
    if (waterWiseDisplay) waterWiseDisplay.textContent = waterWiseCount;
    if (netZeroDisplay) netZeroDisplay.textContent = netZeroCount;
    if (renewablesDisplay) renewablesDisplay.textContent = renewablesCount;

    // run UI layouts and storage
    updateProgress();
    displayAttendees();
    saveCounts();
    checkWinner();

    // reset form
    nameInput.value = "";
    teamSelect.selectedIndex = 0;
}

// 4. Display Attendees List
function displayAttendees() {
    if (!attendeeList) return;

    attendeeList.innerHTML = "";

    attendees.forEach(person => {
        const item = document.createElement("li");

        let teamName = "";
        if (person.team === "water") teamName = "Team Water Wise";
        else if (person.team === "zero") teamName = "Team Net Zero";
        else if (person.team === "power") teamName = "Team Renewables";

        item.textContent = `${person.name} - ${teamName}`;
        attendeeList.appendChild(item);
    });
}

// 5. Progress Bar Fix (Added fallback so it doesn't break the code)
function updateProgress() {
    if (!progressBar) return;
    
    // Calculate percentage based on goal
    const percentage = Math.min((totalAttendance / attendanceGoal) * 100, 100);
    progressBar.style.width = `${percentage}%`;
}

// 6. Check for Goal Winner
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
    } else {
        celebration.textContent = ""; // Clear if goal isn't met yet
    }
}

// 7. LocalStorage Save and Load
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

// 8. Initialization / Event Listeners
// ALWAYS load counts on startup so refresh data works
loadCounts();

if (checkInForm) {
    checkInForm.addEventListener("submit", checkIn);
}