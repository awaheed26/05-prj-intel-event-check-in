let totalAttendance = 0;
let waterWiseCount = 0;
let netZeroCount = 0;
let renewablesCount = 0;
const attendanceGoal = 50;
let attendees = [];

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

const checkInButton = document.getElementById("checkInBtn");

function checkIn(event) {
    
    event.preventDefault();
    const name = nameInput.value.trim();
    const team = teamSelect.value;

    if (name === "") {
        alert("Please enter a name.");
        return;
    }

    greeting.textContent =
`✅ Welcome ${name}! You have successfully checked in.`;

greeting.style.display = "block";
greeting.classList.add("success-message");

    totalAttendance++;
    totalCount.textContent = totalAttendance;

    if (team === "water") {
    waterWiseCount++;
    waterWiseDisplay.textContent = waterWiseCount;
}

   if (team === "zero") {
    netZeroCount++;
    netZeroDisplay.textContent = netZeroCount;
}

  if (team === "power") {
    renewablesCount++;
    renewablesDisplay.textContent = renewablesCount;
}

    attendees.push({
        name,
        team
    });

    updateProgress();
    displayAttendees();
    saveCounts();
    checkWinner();

    nameInput.value = "";
}

function updateProgress() {

    let percent = (totalAttendance / attendanceGoal) * 100;

    if (percent > 100) {
        percent = 100;
    }

    progressBar.style.width = percent + "%";
}

function displayAttendees() {

    attendeeList.innerHTML = "";

    attendees.forEach(person => {

        const item = document.createElement("li");

        item.textContent =
            `${person.name} - ${person.team}`;

        attendeeList.appendChild(item);

    });

}

function checkWinner() {

    if (totalAttendance >= attendanceGoal) {

        let winningTeam = "Water Wise";
        let highest = waterWiseCount;

        if (netZeroCount > highest) {
            highest = netZeroCount;
            winningTeam = "Net Zero";
        }

        if (renewablesCount > highest) {
            highest = renewablesCount;
            winningTeam = "Renewables";
        }

        celebration.textContent =
            `🎉 Attendance goal reached! ${winningTeam} is leading with ${highest} attendees!`;

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

    totalAttendance =
        Number(localStorage.getItem("totalAttendance")) || 0;

    waterWiseCount =
        Number(localStorage.getItem("waterWiseCount")) || 0;

    netZeroCount =
        Number(localStorage.getItem("netZeroCount")) || 0;

    renewablesCount =
        Number(localStorage.getItem("renewablesCount")) || 0;

    attendees =
        JSON.parse(localStorage.getItem("attendees")) || [];

    totalCount.textContent = totalAttendance;

    waterWiseDisplay.textContent = waterWiseCount;

    netZeroDisplay.textContent = netZeroCount;

    renewablesDisplay.textContent = renewablesCount;

    updateProgress();

    displayAttendees();

}

document
  .getElementById("checkInForm")
  .addEventListener("submit", checkIn);

loadCounts();
